import { IsNotEmpty } from "class-validator";

export class DataCategoryDto { 
    @IsNotEmpty({message: "title isn't empty"})
    title: String
}