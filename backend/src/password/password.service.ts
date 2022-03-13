import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import internal from 'stream';
import { Repository } from 'typeorm';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Password } from './password.entity';
import { calculateMD5 } from '../auth/crypto-functions'
import * as crypto from 'crypto';

const ENCRYPTION_TYPE = 'aes-128-cbc';
const INITIALIZATION_VECTOR = '0000000000000000';
const iv = Buffer.from('aeghei1Di8tieNg0');

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>
  ) {}

   encryptPassword(data: string, key: string): string  {
    const md = calculateMD5(key)
      const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(md, "hex"), Buffer.from(INITIALIZATION_VECTOR));
      return cipher.update(data, "utf8", "hex") + cipher.final("hex");
  }

  decryptPassword(encryptedData: string, key: string): string {
      const md = calculateMD5(key)
      const cipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(md, "hex"), Buffer.from(INITIALIZATION_VECTOR));
      return cipher.update(encryptedData, 'hex', 'utf8') + cipher.final('utf8');
  }

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
        encryptedPassword: this.encryptPassword(
          body.hashedPassword,
          user.passwordAccount
        ),
        user: user,
      });
      return this.passwordRepository.save(password);
    } catch (error) {
      throw error;
    }
  }

  async getDecryptedPassword(id: number, user: User): Promise<Password> {
    try {
      let passwordObj = await this.passwordRepository.findOne(id);
      passwordObj.encryptedPassword = this.decryptPassword(
        passwordObj.encryptedPassword,
        user.passwordAccount
      );
      return passwordObj;
    } catch (error) {
      throw error;
    }
  }

  async updateUserEncryptionKey(
    newEncryptionKey: string,
    user: User
  ): Promise<void> {
    try {
      const oldEncryptionKey = user.password;
      const userOldPasswords = await this.passwordRepository.find({
        where: { user: user },
      });
      userOldPasswords.forEach(async (password: Password) => {
        // decrypt password using old key
        const rawPassword = this.decryptPassword(
          password.encryptedPassword,
          user.passwordAccount
        );
        // encrypt using new key
        const newEncryptedPassword = this.encryptPassword(
          rawPassword,
          newEncryptionKey
        );
        // update db record
        password.encryptedPassword = this.encryptPassword(
          rawPassword,
          newEncryptionKey
        );
        await this.passwordRepository.save(password);
      });
    } catch (error) {
      throw error;
    }
  }
}
