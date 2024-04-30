import { Req, Body, Controller, HttpCode, HttpStatus, Post, Res, Get, Patch, Param, Delete } from "@nestjs/common";
import { Request, Response } from "express";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { OrderServie } from "./order.service";
import { OrderCoffeeDto } from "./dtos/order-coffee.dto";
import { Types } from "mongoose";
import { IOrderCoffeeResponse } from "./interfaces/responses/order-coffee.interface";
import { IGetAllOrders } from "./interfaces/responses/get-all-orders.interface";
import { IReceivedOrder } from "./interfaces/responses/received-successfully.interface";
import { IDeleteOrder } from "./interfaces/responses/delete-order.interface";
import { IGetAllOrdersUser } from "./interfaces/responses/get-all-orders-login.interface";
type Id = Types.ObjectId
@Controller("order")
export class OrderController {
    constructor(private orderService: OrderServie){}
    @Post(Endpoint.ORDER_COFFEE)
    @HttpCode(HttpStatus.OK)
    async order(@Req() req: Request,@Body() dataOrder: OrderCoffeeDto, @Res() res: Response): Promise<void> { 
        const id_user: Id = req["user"]["_id"]; 
        await this.orderService.orderCoffee({...dataOrder, id_user})
        const responseOrderCoffee: IOrderCoffeeResponse = { 
            success: true,
            mes: "order successfully"
        }
        res.json(responseOrderCoffee)
    }

    @Get(Endpoint.GET_ALL_ORDER)
    @HttpCode(HttpStatus.OK)
    async getAllOrders(@Res() res: Response): Promise<void> { 
        const getAllOrdersResponse: IGetAllOrders = { 
            success: true,
            mes: "All orders have been successfully received",
            allOrders: await this.orderService.findAll()
        }
        res.json(getAllOrdersResponse);
    }

    @Patch(Endpoint.RECEIVED_ORDER)
    @HttpCode(HttpStatus.OK)
    async received(@Param("id") id: Id, @Res() res: Response): Promise<any> { 
        await this.orderService.update(id, {status: "đã nhận hàng"})
        const receivedOrder : IReceivedOrder = { 
            success: true,
            mes: "received successfully"
        }
        res.json(receivedOrder);
    } 

    @Delete(Endpoint.DELETE_ORDER)
    @HttpCode(HttpStatus.OK)
    async deleteOrder(@Param("id") id: Id, @Res() res: Response ): Promise<void> { 
        await this.orderService.delete(id);
        const response: IDeleteOrder = {
            success: true,
            mes: "delete order successfully"
        }
        res.json(response);
    }

    @Get(Endpoint.GET_ALL_ORDER_USER_LOGIN)
    @HttpCode(HttpStatus.OK)
    async getAllOrderLogin(@Req() req: Request, @Res() res: Response): Promise<void> {
        const id: Id = req["user"]["_id"]  
        const response: IGetAllOrdersUser = { 
            success: true,
            mes: "All orders have been successfully received",
            allOrders: await this.orderService.findAll({user_id: id})
        }   
        res.json(response);
    }

    @Patch(Endpoint.CANCLE_ORDER)
    @HttpCode(HttpStatus.OK)
    async cancleOrder(@Req() req: Request, @Param("id") id_order: Id): Promise<void> { 
        const id_user: Id = req["user"]["_id"];
        await this.orderService.cancleOrder(id_user, id_order);
    }
}