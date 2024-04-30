import { IsEmail, IsNotEmpty } from "class-validator";
export class CreateCategoryDto {
    @IsNotEmpty({ message: 'title is not empty' })
    title : string
}