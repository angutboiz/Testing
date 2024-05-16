import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  address: string;

  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsString()
  userId: number;
}
