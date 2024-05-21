import { Transform, TransformFnParams } from 'class-transformer';
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
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstName: string;

  @IsString()
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  city: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  province: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  address: string;

  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsString()
  avatar: string;
}
