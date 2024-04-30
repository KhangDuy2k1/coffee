import { Controller, Get, Post, Body, Res, Req, HttpStatus, HttpCode, Delete, Param, Put} from "@nestjs/common";
import { Response } from "express";
import { Types } from "mongoose";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { CategoryService } from "./category.service";
import { ICreateCatetory } from "./interface/responses/create-category.interface";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { IGetAllCategory } from "./interface/responses/get-all-category.interface";
import { IDeleteCategory } from "./interface/responses/delete-category.interface";
import { DataCategoryDto } from "./dtos/update-category.dto";
import { IUpdateCategory } from "./interface/responses/udpate-category.interface";
type Id = Types.ObjectId;
@Controller("category")
export class CategoryController { 
    constructor(private categoryService: CategoryService){}
    @Post(Endpoint.ADD_CATEGORY)
    @HttpCode(HttpStatus.CREATED)
    async createCategory(@Body() dataCategory: CreateCategoryDto, @Res() res: Response): Promise<any> {
        await this.categoryService.create(dataCategory);
        const response: ICreateCatetory = { 
            success: true,
            mes: "Add category successfully"
        }
        res.json(response)
    }
    
    @Get(Endpoint.GET_ALL_CATEGORY)
    @HttpCode(HttpStatus.OK)
    async getAllCategory(@Res() res: Response): Promise<void> {
        const response: IGetAllCategory = {
            success: true,
            mes: "get all category successfully",
            allCategory: await this.categoryService.findAll()
        }
        res.json(response);
    }
    
    @Delete(Endpoint.DELETE_CATEGORY)
    @HttpCode(HttpStatus.OK)
    async deleteCategory(@Param("id") id: Id, @Res() res: Response): Promise<void> { 
        await this.categoryService.delete(id);
        const deleteResponse: IDeleteCategory = { 
            success: true,
            mes: "delete category successfully"
        }
        res.json(deleteResponse);
    }

    @Put(Endpoint.UPDATE_CATEGORY)
    @HttpCode(HttpStatus.OK)
    async updateCategory(@Param("id") id: Id, @Body() dataCategory: DataCategoryDto, @Res() res: Response): Promise<any> { 
        console.log("hello")
        await this.categoryService.update(id, dataCategory)
        const responseUpdate: IUpdateCategory = {
            success: true,
            mes: "update category successfully"
        }
        res.json(responseUpdate);
    }

}
