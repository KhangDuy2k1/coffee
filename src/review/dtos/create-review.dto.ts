import { IsInt, IsMongoId, IsNumber, Min, Max } from "class-validator";
import { Types } from "mongoose"

type Id = Types.ObjectId;
export class AddReviewDto {
    @IsInt()
    @Min(0)
    @Max(5)
    stars: Number
}