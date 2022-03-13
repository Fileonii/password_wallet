import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { PasswordType } from 'src/auth/crypto-functions';

export class CreatePasswordDto {
  @IsNotEmpty()
  service: string;
  @ApiProperty({ example: "password", description: "Password to hash"})
  @IsNotEmpty()
  hashedPassword: string;
}
