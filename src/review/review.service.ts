import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { IReview } from "./interfaces/review.interface";
import { ReviewRepository } from "./review.repository";
import { Types } from "mongoose";
import { CoffeeItemService } from "src/coffeeItem/coffee-Item.service";
type Id = Types.ObjectId;
@Injectable()
export class ReviewService extends BaseService<IReview,ReviewRepository> { 
        constructor(private reviewRepository: ReviewRepository, private coffeeItemService: CoffeeItemService){
            super(reviewRepository);
        }
    async review({id_user, stars, id_coffee}): Promise<void> {
        await this.reviewRepository.create({id_user, stars, id_coffee});
        const starsAvg: number =  await this.reviewRepository.calculateStarsAverage(id_coffee);
        await this.coffeeItemService.update(id_coffee, {stars: starsAvg});
    }   
}