import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
const crypto = require('crypto')
const INITIALIZATION_VECTOR = '0000000000000000'
export const calculateSha512 = (text,salt,pepper):string =>{
  return crypto.createHash('sha512')
  .update(text+salt+pepper,'utf8')
  .digest('hex')
}

export const calculateHMAC = (text,key):string =>{
  return crypto.createHash('sha512',key)
  .update(text,'utf8')
  .digest('hex')
}

export const generateSalt = () =>{
  return crypto.randomBytes(14).toString('base64')
}
export const encrypt = (data,key) => {
  const cipher = crypto.createCypheriv('aes-128-cbc', Buffer.from(key,"hex"),
  Buffer.from(INITIALIZATION_VECTOR))
  return cipher.update(data,'utf8','hex') + cipher.final('hex')
}
export const decrypt = (encryptedData,key) =>{
  const cipher = crypto.createCypheriv('aes-128-cbc', Buffer.from(key,"hex"),
  Buffer.from(INITIALIZATION_VECTOR))
  return cipher.update(encryptedData,'hex','utf8') + cipher.final('utf8')
}
export const calculateMD5 = (text) =>{
  return crypto.createHash('MD5')
  .update(text,'utf8')
  .digest('hex')
}

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
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @GetUser() user: User){
    const body :AuthCretendialsDto = {
      username:user.username,
      password:changePasswordDto.password,
    }
    return this.authService.changePassword(body);
  }
  // @Get('/password')
  // @UseGuards()
}
