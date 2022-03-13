import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class UpdateEncryptionKeyDto {
  @IsNotEmpty()
  service: string;
  @IsNotEmpty()
  newPassword: string;
  @IsNotEmpty()
  pswdType: string;
}
