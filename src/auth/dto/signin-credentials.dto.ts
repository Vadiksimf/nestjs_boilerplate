import { IsNotEmpty, IsString } from 'class-validator';

export class SigninCredentialsDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
