import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  
  @IsString()
  @IsNotEmpty()
  name : string;
  
  @IsString()
  contact_no: string; 

  @IsEmail({},{ message: 'Please enter a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
  

  @IsOptional()
  @IsString()
  gst_no?: string;
  
}

