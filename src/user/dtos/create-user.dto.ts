import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty
} from "class-validator"
export class CreateUserDto { 
     @IsEmail()
     @IsNotEmpty()
     email: string;

     @IsNotEmpty()
     password: string;

     @IsNotEmpty()
     @IsMobilePhone()
     phonenumber: string;
}