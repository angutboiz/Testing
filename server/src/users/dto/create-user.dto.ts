import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
