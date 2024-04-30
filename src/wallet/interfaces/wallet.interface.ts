import { Document } from "mongoose";
import { Types } from "mongoose";
type Id = Types.ObjectId
export interface IWallet extends Document { 
    id_user: Id,
    amountMoney: number
}