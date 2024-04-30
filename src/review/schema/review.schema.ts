import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { CoffeeItem } from "src/coffeeItem/schema/coffee-Item.schema";
import { User } from "src/user/schema/user.schema";
@Schema()
export class Review extends Document { 
    @Prop({type: Types.ObjectId, ref: User.name})
    id_user: Types.ObjectId
    @Prop({type: Types.ObjectId, ref: CoffeeItem.name})
    id_coffee: Types.ObjectId
    @Prop()
    stars: Number
}
export const ReviewSchema = SchemaFactory.createForClass(Review)