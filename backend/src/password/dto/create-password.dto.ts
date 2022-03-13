import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreatePasswordDto {
  @IsNotEmpty()
  service: string;
  @ApiProperty({ example: "password", description: "Password to hash"})
  @IsNotEmpty()
  hashedPassword: string;
  @ApiProperty({ example: "sha-256", description: "Method of hashing"})
  @IsNotEmpty()
  pswdType: string;
}
