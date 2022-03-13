import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import {
  calculateHMAC,
  calculateSha512,
  generateSalt,
  PasswordType,
} from './crypto-functions';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCrdentialsDto: AuthCretendialsDto): Promise<void> {
    return this.userRepository.createUser(authCrdentialsDto);
  }

  async signIn(
    authCretendialsDto: AuthCretendialsDto
  ): Promise<{ accessToken: string }> {
    const { username, password, passwordType } = authCretendialsDto;
    const user = await this.userRepository.findOne({ username });
    let hashedPassword: string;
    if (passwordType == PasswordType.TYPE_HMAC) {
      hashedPassword = calculateHMAC(password, 'SECRETKEY');
    }
    if (passwordType == PasswordType.TYPE_SHA) {
      hashedPassword = calculateSha512(password, user.salt, 'SECRETKEY');
    }
    if (user && hashedPassword === user.passwordAccount) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }
  }
  async changePassword(authCretendialsDto: AuthCretendialsDto) {
    return this.userRepository.changePassword(authCretendialsDto);
  }
}
