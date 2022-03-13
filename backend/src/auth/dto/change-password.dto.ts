import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Hasło musi zawierać conajmniej jedną wielką literę i znak specjalny',
  })
  password: string;
  passwordType: string;
}
