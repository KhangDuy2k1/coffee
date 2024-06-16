import { Types } from "mongoose";
export interface ICoffeeItem extends Document {
    name: string;
    price: number
    volume: number
    stars: number
    image: string;
    desc: string;
    // category: Types.ObjectId
}