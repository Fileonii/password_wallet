import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordService } from 'src/password/password.service';
import { AuthService } from './auth.service';
import {
  calculateHMAC,
  calculateSha512,
  generateSalt,
  PasswordType,
} from './crypto-functions';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordService: PasswordService
  ) {}
  @Post('/signup')
  signUp(@Body() authCretendialsDto: AuthCretendialsDto): Promise<void> {
    return this.authService.signUp(authCretendialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCretendialsDto: AuthCretendialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCretendialsDto);
  }

  @Put('/password')
  @UseGuards(AuthGuard())
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User
  ) {
    let hashedPassword;
    let salt = null;
    if (changePasswordDto.passwordType == PasswordType.TYPE_HMAC) {
      user.passwordType = changePasswordDto.passwordType;
      hashedPassword = calculateHMAC(changePasswordDto.password, 'SECRETKEY');
    }
    if (changePasswordDto.passwordType == PasswordType.TYPE_SHA) {
      user.passwordType = changePasswordDto.passwordType;
      salt = generateSalt();
      hashedPassword = calculateSha512(
        changePasswordDto.password,
        salt,
        'SECRETKEY'
      );
    }
    const body: AuthCretendialsDto = {
      username: user.username,
      password: changePasswordDto.password,
      passwordType: changePasswordDto.passwordType,
    };
    this.passwordService.updateUserEncryptionKey(body.password, user);
    return this.authService.changePassword(body, salt);
  }
}
