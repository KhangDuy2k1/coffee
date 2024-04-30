import {IsMongoId, IsNotEmpty, IsNumber} from "class-validator";
export class OrderCoffeeDto {
    @IsMongoId()
    @IsNotEmpty()
    coffeeitem_id: string;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    @IsNotEmpty()
    @IsNumber()
    total: number;
}