import { ApiProperty } from '@nestjs/swagger';

import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { PasswordType } from 'src/auth/crypto-functions';

export class UpdateEncryptionKeyDto {
  @IsNotEmpty()
  service: string;
  @ApiProperty({ example: "new-password", description: "New account password to hash"})
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty({ example: "sha-256", description: "Method of hashing"})
  @IsNotEmpty()
  passwordType: PasswordType;
}
