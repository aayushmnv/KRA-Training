import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
import { Transform } from 'class-transformer';

export class UserDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}