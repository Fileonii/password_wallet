import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import internal from 'stream';
import { Repository } from 'typeorm';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Password } from './password.entity';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>
  ) {}
  getAllPasswords(user: User): Promise<Password[]> {
    return this.passwordRepository.find({ where: { user: user } });
  }
  async createNewPassword(
    body: CreatePasswordDto,
    user: User
  ): Promise<Password> {
    try {
      const password = this.passwordRepository.create({
        service: body.service,
        hashedPassword: body.hashedPassword,
        user: user
      });
      return this.passwordRepository.save(password);
    } catch (error) {
      throw error;
    }
  }

  async decryptPassword(id: number, user: User) : Promise<Password> {
    try {
      const password = this.passwordRepository.findOne(id)
      // TODO: decrypt using password encryption type
      return password
    } catch (error) {
      throw error;
    }
  }
}
