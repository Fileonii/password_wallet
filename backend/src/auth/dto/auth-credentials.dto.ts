import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PasswordType } from '../crypto-functions';

export class AuthCretendialsDto {
  @IsString()
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Hasło musi zawierać conajmniej jedną wielką literę i znak specjalny',
  })
  password: string;
  passwordType: PasswordType;
}
