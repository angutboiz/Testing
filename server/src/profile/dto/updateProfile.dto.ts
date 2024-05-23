import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  province: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
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
