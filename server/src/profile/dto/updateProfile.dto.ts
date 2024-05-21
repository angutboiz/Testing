import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Transform(({ value }: TransformFnParams) => value?.trim())
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
