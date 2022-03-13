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
import { AuthService } from './auth.service';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
    const body: AuthCretendialsDto = {
      username: user.username,
      password: changePasswordDto.password,
      passwordType: changePasswordDto.passwordType,
    };
    return this.authService.changePassword(body);
  }
}
