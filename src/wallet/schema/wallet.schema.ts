import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";
type Id = Types.ObjectId
@Schema()
export class Wallet extends Document { 
    @Prop({type: Types.ObjectId, unique: true})
    id_user: Id
    @Prop({type: Types.ObjectId, default: 0})
    amountMoney: number
} 
export const WalletSchema = SchemaFactory.createForClass(Wallet); 