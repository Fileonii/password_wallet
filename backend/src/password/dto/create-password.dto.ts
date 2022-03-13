import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { PasswordType } from 'src/auth/crypto-functions';

export class CreatePasswordDto {
  @IsNotEmpty()
  service: string;
  @IsNotEmpty()
  hashedPassword: string;
}
