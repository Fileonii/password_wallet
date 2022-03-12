import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreatePasswordDto {
  @IsNotEmpty()
  service: string;
  @IsNotEmpty()
  hashedPassword: string;
}
