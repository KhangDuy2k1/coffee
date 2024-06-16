import {IsMongoId, IsNotEmpty, IsNumber, IsString} from "class-validator";
import { Types } from "mongoose";
export class OrderCoffeeDto {
    @IsMongoId()
    @IsNotEmpty()
    @IsMongoId()
    coffeeItem_id: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    id_address: Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    total: number;
}