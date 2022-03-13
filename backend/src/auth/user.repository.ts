import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { error } from 'console';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCretendialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCrdentialsDto: AuthCretendialsDto): Promise<void> {
    const { username, password } = authCrdentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, passwordAccount: hashedPassword });
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
  async changePassword(authCretendialsDto: AuthCretendialsDto){
    const { username, password } = authCretendialsDto;
    const user = await this.findOne({ username });
    const salt = await bcrypt.genSalt();
    user.passwordAccount = await bcrypt.hash(password, salt);
    await this.save(user);
  }
}
