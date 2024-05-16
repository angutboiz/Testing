import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  address: string;

  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  avatar: string;

  @IsString()
  userId: number;
}
