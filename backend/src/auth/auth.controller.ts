import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';

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

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
