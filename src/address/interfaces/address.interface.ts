import { Types, Document } from "mongoose";
export interface IAddress extends Document {
    address: string,
    phonenumber: string,
    id_user: Types.ObjectId
}