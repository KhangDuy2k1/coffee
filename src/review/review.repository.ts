import { Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { IReview } from "./interfaces/review.interface";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Review } from "./schema/review.schema";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
type Id = Types.ObjectId;
@Injectable()
export class ReviewRepository implements Repository<IReview> {
    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>){}
    async create(data: any): Promise<any> {
        try {
            const newReview = new this.reviewModel(data)
            newReview.save()
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async update(id: Types.ObjectId, data: any): Promise<void> {
        try {
            await this.reviewModel.updateOne({_id: id}, data)
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async delete(id: Types.ObjectId): Promise<any> {
        try {
            await this.reviewModel.deleteOne({_id: id})
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async findById(id: Types.ObjectId): Promise<IReview> {
        try {
            return await this.reviewModel.findById(id);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            
        }
    }
    async findAll(conditions?: any): Promise<IReview[]> {
        try {
            return await this.reviewModel.find(conditions);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
        
    }
    async calculateStarsAverage(id_coffee: Id): Promise<number> { 
        try {
           return (await this.reviewModel.aggregate([
                {
                    $match: {
                        id_coffee: id_coffee
                    }
                },
                {
                    $group: {
                        _id: "$id_coffee",
                        avgStars: {
                            $avg: "$stars"
                        }
                    }
                },
                {
                    $project: { 
                        _id: 0,
                        avgRoundStars: {
                            $round: ["$avgStars", 1]
                        }
                    }
                }
            ]))[0]["avgRoundStars"];
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }       
    }
}