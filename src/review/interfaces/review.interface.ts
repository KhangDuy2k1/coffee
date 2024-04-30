import { Types } from "mongoose"
type Id = Types.ObjectId;
export interface IReview extends Document {
    id_coffee: Id,
    id_user: Id,
    stars: Number
}