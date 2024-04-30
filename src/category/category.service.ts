import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { ICategory } from "./interface/category.interface";
import { CategoryRepository } from "./category.repository";

@Injectable()
export class CategoryService extends BaseService<ICategory, CategoryRepository> {   
    constructor(private categoryRepository: CategoryRepository){
        super(categoryRepository);
    }
}