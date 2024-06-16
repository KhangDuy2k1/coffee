import { IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
export class CreateAddressDto { 
    @IsString()
    @IsNotEmpty()
    address: string
    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    phonenumber: string
}