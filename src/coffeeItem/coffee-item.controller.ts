import { Req, Res, Body, Controller, HttpCode, HttpStatus,Get, Post, Delete, Param,Put , Type, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { Response } from "express";
import { CreateCoffeeDto } from "./dtos/create-coffee.dto";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { CoffeeItemService } from "./coffee-Item.service";
import { ICreateCoffeeResponse } from "./interfaces/responses/create-coffee.interface";
import { IGetAllCoffee } from "./interfaces/responses/get-all-coffees.interface";
import { IDeleteCoffee } from "./interfaces/responses/delete-coffee.interface";
import { UpdateCoffeeDto } from "./dtos/update-coffee.dto";
import { IUpdateCoffee } from "./interfaces/responses/update-coffee.interface";
import { IGetCoffeeById } from "./interfaces/responses/get-coffee-by-id.interface";
type Id = Types.ObjectId;
@Controller("coffee-item")
export class CoffeeitemController {
    constructor(private coffeeItemService: CoffeeItemService){} 
    @Post(Endpoint.ADD_COFFEE)
    @HttpCode(HttpStatus.CREATED)
    async addCoffee(@Body() dataCoffee: CreateCoffeeDto, @Res() res: Response){
    
        await this.coffeeItemService.create(dataCoffee);
        const addCoffeeResponse: ICreateCoffeeResponse = { 
            success: true,
            mes: "add coffee succesfully"
        }
        res.json(addCoffeeResponse);
    }

    @Get(Endpoint.GET_ALL_COFFEE) 
    @HttpCode(HttpStatus.OK)
    async getAllCoffee(@Query() query: any,@Res() res: Response): Promise<void> { 
        const allCoffeeResponse: IGetAllCoffee = { 
            success: true,
            mes: "get all coffee successfully",
            allCoffee: !query ? await this.coffeeItemService.findAll() : await this.coffeeItemService.getCoffeePage(query)
        }
        res.json(allCoffeeResponse);
    }

    @Delete(Endpoint.DELETE_COFFEE)
    @HttpCode(HttpStatus.OK)
    async deleteCoffee(@Param("id") id: Id, @Res() res: Response): Promise<void> {
        await this.coffeeItemService.delete(id)
        const deleteCoffee: IDeleteCoffee = { 
            success: true,
            mes: "delete coffee succesfully"
        }
        res.json(deleteCoffee);
    }

    @Put(Endpoint.UPDATE_COFFEE)
    @HttpCode(HttpStatus.OK)
    async updateCoffee(@Param("id") id: Id,  @Body() dataUpdate: UpdateCoffeeDto, @Res() res: Response):Promise<void> { 
        await this.coffeeItemService.update(id, dataUpdate);
        const responseUpdate: IUpdateCoffee = { 
            success: true,
            mes: "update coffee successfully"
        }
        res.json(responseUpdate);
    }

    @Get(Endpoint.GET_COFFEE_BY_ID)
    @HttpCode(HttpStatus.OK)
    async getCoffeeById(@Param("id") id: Id, @Res() res: Response ): Promise<void> { 
       const getCoffeeById: IGetCoffeeById = {
        success: true,
        mes: "get coffee by Id successfully",
        CoffeeByid: await this.coffeeItemService.findById(id)
       }
       res.json(getCoffeeById)
    }
}