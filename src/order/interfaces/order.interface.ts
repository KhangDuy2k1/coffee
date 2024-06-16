import { Types } from "mongoose";
import { Document } from "mongoose";
type Id = Types.ObjectId;
export interface IOrder {
     coffeeItem_id: Id;
     user_id: Id;
     id_address: Id;
     quantity: number;
     total: number;
     status: string;
}