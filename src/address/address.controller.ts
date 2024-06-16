import { Controller, Post, Get, Res, Req, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { Response } from "express";
import { IGetAllAddress } from "./interfaces/responses/get-all-address.interface";
import { AddressService } from "./address.service";
import { Types } from "mongoose";
import { IAddAddress } from "./interfaces/responses/add-address.interface";
import { CreateAddressDto } from "./dtos/create-address.dto";
@Controller("address")
export class AddressController { 
    constructor(private addressService: AddressService){}
    @Get(Endpoint.GET_ALL_ADDRESS_ORDER)
    @HttpCode(HttpStatus.OK)
    async getAllAddress(@Req() req: Request, @Res() res: Response){
        const id_user: Types.ObjectId = req["user"]["_id"];
        const response: IGetAllAddress = { 
            success: true,
            mes: "get all address successfully",
            allAddress: await this.addressService.findAll({id_user: id_user})
        }
        res.json(response)
    }

    @Post(Endpoint.ADD_ADDRESS_ORDER)
    @HttpCode(HttpStatus.CREATED)
    async addAddress(@Req() req: Request, @Body() data: CreateAddressDto, @Res() res: Response){
        const id_user: Types.ObjectId = req["user"]["_id"]
        await this.addressService.create({...data, id_user})
        const reponse: IAddAddress = {
            success: true,
            mes: "add address successfully"
        }
        res.json(reponse);
    }
}