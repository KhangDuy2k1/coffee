import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator"
export class UpdateUserDto { 
    @IsOptional()
    @IsEmail()
    email: string;
    @IsOptional()
    phonenumber: string;
    @IsOptional()
    @IsString()
    role: string;
}