import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Address } from "src/address/schema/address.schema";
import { CoffeeItem } from "src/coffeeItem/schema/coffee-Item.schema";
import { Status } from "src/common/constants/status.constant";
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
    @Prop({default: Status.ORDERED})
    status: string
    @Prop({type: Types.ObjectId, ref: Address.name})
    id_address: Id
    @Prop()
    total: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
