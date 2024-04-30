import { Req, Res, Controller, HttpCode, HttpStatus, Post, Body, Param } from "@nestjs/common";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { ReviewService } from "./review.service";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { AddReviewDto } from "./dtos/create-review.dto";
import { IReviewCoffee } from "./interfaces/responses/review-coffee.interface";
type Id = Types.ObjectId;
@Controller("review")
export class ReviewController {
    constructor(private reviewService: ReviewService){}
    @Post(Endpoint.REVIEW_COFFEE)
    @HttpCode(HttpStatus.OK) 
    async reviewCoffee(@Req() req: Request,@Body() infoStars: AddReviewDto, @Param("id") id: Id, @Res() res: Response): Promise<void> { 
        const id_user: Id  = req["user"]["_id"];
        await this.reviewService.review({id_user: id_user, id_coffee: id, ...infoStars})
        const reviewCoffeeResponse: IReviewCoffee = { 
            success: true,
            mes: "review successfully"
        }
        res.json(reviewCoffeeResponse);
    }
}