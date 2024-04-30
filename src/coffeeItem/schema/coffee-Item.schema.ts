import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Category } from "src/category/schema/category.schema";
@Schema({timestamps: true})
export class CoffeeItem extends Document{
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    price: number
    @Prop({required: true})
    volume: number
    @Prop({default: 0})
    stars: number
    @Prop()
    image: string;
    @Prop()
    desc: string;
    @Prop({type: Types.ObjectId, ref: Category.name})
    category: Types.ObjectId
}
export const CoffeeItemSchema = SchemaFactory.createForClass(CoffeeItem);