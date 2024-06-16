import { IsInt, IsMongoId, IsNumber, Min, Max } from "class-validator";
import { Types } from "mongoose";

type Id = Types.ObjectId;
export class AddReviewDto {
    @IsInt()
    stars: Number
}