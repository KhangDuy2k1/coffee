import mongoose, {Document} from "mongoose";
export interface IUser extends Document{
     email: string;
     password: string;
     phonenumber: string;
     role: string;
     likedCoffeeItem: mongoose.Types.ObjectId[];
     avatar: string;
     reftoken: String; 
}