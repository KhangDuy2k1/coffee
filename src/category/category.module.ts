import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./schema/category.schema";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";
import { Category } from "./schema/category.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
    ],
    controllers: [CategoryController],
    providers: [CategoryRepository, CategoryService],
})
export class CategoryModule{}