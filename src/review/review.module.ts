import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Review } from "./schema/review.schema";
import { ReviewSchema } from "./schema/review.schema";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { ReviewRepository } from "./review.repository";
import { CoffeeItemModule } from "src/coffeeItem/coffee-item.module";
@Module({
 imports: [
    MongooseModule.forFeature([{name: Review.name, schema: ReviewSchema}]),
    CoffeeItemModule
 ],
 controllers: [ReviewController],
 providers: [ReviewService, ReviewRepository]
})
export class ReviewModule {}