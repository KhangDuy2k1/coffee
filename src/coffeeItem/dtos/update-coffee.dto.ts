import {IsNotEmpty, IsNumber, IsString, IsMongoId} from "class-validator";
import { Types } from "mongoose";
type Id = Types.ObjectId
export class UpdateCoffeeDto { 
    @IsNotEmpty({message: "Name isn't empty"}) 
    name: String
    @IsNotEmpty({message: "price isn't empty"})
    @IsNumber()
    price: Number
    @IsNotEmpty({message: "volumn isn't empty"})
    @IsNumber()
    volume: Number
    @IsNotEmpty({message: "image isn't empty"})
    image: string
    @IsString()
    desc: string
    // @IsNotEmpty({message: "category_id isn't empty"})
    // @IsMongoId()
    // category: Id
}