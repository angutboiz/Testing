import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsString()
  avatar: string;
}
