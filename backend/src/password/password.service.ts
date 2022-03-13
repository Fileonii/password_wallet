import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import internal from 'stream';
import { Repository } from 'typeorm';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Password } from './password.entity';
import * as crypto from "crypto";

const ENCRYPTION_TYPE = 'aes-128-ccm'
const INIT_VEC = '0000000000000000'

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>
  ) {}

  encryptPassword(password: string, key: string) : string {
    const cipher = crypto.createCipheriv(ENCRYPTION_TYPE, Buffer.from(key, 'hex'),Buffer.from(INIT_VEC))
    return cipher.update(password, "utf8", "hex") + cipher.final("hex")
  }

  decryptPassword(password: string, key: string) : string{
    const cipher = crypto.createDecipheriv(ENCRYPTION_TYPE, Buffer.from(key, 'hex'),Buffer.from(INIT_VEC))
    return cipher.update(password, "hex", "utf8") + cipher.final("utf8")
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
        encryptedPassword: body.hashedPassword,
        user: user
      });
      return this.passwordRepository.save(password);
    } catch (error) {
      throw error;
    }
  }

  async getDecryptedPassword(id: number, user: User) : Promise<Password> {
    try {
      let passwordObj = await this.passwordRepository.findOne(id)
      passwordObj.encryptedPassword = this.decryptPassword(passwordObj.encryptedPassword, user.passwordAccount)
      return passwordObj
    } catch (error) {
      throw error;
    }
  }

  async updateUserEncryptionKey(newEncryptionKey: string, user: User) : Promise<void> {
    try {
      const oldEncryptionKey = user.password
      const userOldPasswords = await this.passwordRepository.find({ where: { user: user } });
      userOldPasswords.forEach(async (password: Password) => {
        // decrypt password using old key
        const rawPassword = this.decryptPassword(password.encryptedPassword, user.passwordAccount)
        // encrypt using new key
        const newEncryptedPassword = this.encryptPassword(rawPassword, newEncryptionKey)
        // update db record
        password.encryptedPassword = this.encryptPassword(rawPassword, newEncryptionKey)
        await this.passwordRepository.save(password);
      })
    } catch (error) {
      throw error;
    }
  }
}
