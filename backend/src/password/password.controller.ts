import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Password } from './password.entity';
import { PasswordService } from './password.service';

@Controller('password')
@UseGuards(AuthGuard())
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Get()
  getAllPasswords(@GetUser() user: User): Promise<Password[]> {
    return this.passwordService.getAllPasswords(user);
  }

  @Post()
  async createNewPassword(
    @Body() body: CreatePasswordDto,
    @GetUser() user: User,
  ): Promise<Password> {
    return this.passwordService.createNewPassword(body, user);
  }

  @Get('/:passwordId')
  async getDecryptedPassword(
    @Param() passwordId,
    @GetUser() user: User
  ): Promise<Password> {
    return this.passwordService.decryptPassword(passwordId, user);
  }
}
