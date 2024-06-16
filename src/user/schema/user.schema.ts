import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {Document, Types} from "mongoose";
import { CoffeeItem } from "src/coffeeItem/schema/coffee-Item.schema";
import { UserConstant } from "src/common/constants/user.constant";
@Schema()
export class User extends Document { 
    @Prop({required: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true})
    phonenumber: string;
    @Prop({default: UserConstant.ROLE_USER_DEFAULT})
    role: string;
    @Prop({default: false})
    block: boolean;
    @Prop({type: [{type: Types.ObjectId, ref: "CoffeeItem"}]})
    likedCoffeeItem: Types.ObjectId[]
    @Prop({default: UserConstant.AVATAR_USER})
    avatar: string;
    @Prop({default: ""})
    reftoken: string
}
export const UserSchemma = SchemaFactory.createForClass(User);