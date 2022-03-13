import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { PasswordType } from 'src/auth/crypto-functions';

export class UpdateEncryptionKeyDto {
  @IsNotEmpty()
  service: string;
  @IsNotEmpty()
  newPassword: string;
  @IsNotEmpty()
  passwordType: PasswordType;
}
