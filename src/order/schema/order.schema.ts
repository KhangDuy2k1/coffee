import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { CoffeeItem } from "src/coffeeItem/schema/coffee-Item.schema";
import { UserConstant } from "src/common/constants/user.constant";
import { User } from "src/user/schema/user.schema";
type Id = Types.ObjectId;
@Schema({timestamps: true})
export class Order extends Document {
    @Prop({require: true}) 
    quantity: number 
    @Prop({type: Types.ObjectId, ref: User.name})
    user_id: Id
    @Prop({type: Types.ObjectId, ref: CoffeeItem.name})
    coffeeItem_id: Id
    @Prop({default: UserConstant.STATUS_ORDER_DEFAULT})
    status: string
    @Prop()
    total: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
