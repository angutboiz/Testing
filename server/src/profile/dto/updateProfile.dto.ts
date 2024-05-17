import {
  IsString,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  lastName: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsOptional()
  @IsString()
  avatar: string;
}
