import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { User } from "src/user/schema/user.schema";
type Id = Types.ObjectId;
@Schema()
export class Address extends Document { 
    @Prop({require: true})
    address: string
    @Prop({required: true})
    phonenumber: string
    @Prop({type: Types.ObjectId, ref: User.name})
    id_user: Id
}
export const AddressShema = SchemaFactory.createForClass(Address);