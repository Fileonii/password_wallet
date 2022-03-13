import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { error } from 'console';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  calculateHMAC,
  calculateSha512,
  generateSalt,
  PasswordType,
} from './crypto-functions';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCretendialsDto: AuthCretendialsDto): Promise<void> {
    const { username, password, passwordType } = authCretendialsDto;
    let hashedPassword: string;
    let salt: string = null;
    if (passwordType == PasswordType.TYPE_HMAC) {
      hashedPassword = calculateHMAC(password, 'SECRETKEY');
    }
    if (passwordType == PasswordType.TYPE_SHA) {
      salt = generateSalt();
      hashedPassword = calculateSha512(password, salt, 'SECRETKEY');
    }
    const user = this.create({
      username: username,
      passwordAccount: hashedPassword,
      passwordType: passwordType,
      salt: salt,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException(error.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async changePassword(authCretendialsDto: AuthCretendialsDto, salt: string) {
    const { username, password, passwordType } = authCretendialsDto;
    const user = await this.findOne({ username });
    user.salt = salt;
    await this.save(user);
  }
}
