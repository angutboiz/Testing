import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
