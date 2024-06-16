import { Req, Body, Controller, HttpCode, HttpStatus, Post, Res, Get, Patch, Param, Delete, Query } from "@nestjs/common";
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
import { Status } from "src/common/constants/status.constant";
type Id = Types.ObjectId
@Controller("order")
export class OrderController {
    constructor(private orderService: OrderServie){}
    @Post(Endpoint.ORDER_COFFEE)
    @HttpCode(HttpStatus.OK)
    async order(@Req() req: Request,@Body() dataOrder: OrderCoffeeDto,
    @Param("method") method: string,  @Res() res: Response): Promise<void> {
        const user_id: Id = req["user"]["_id"];
        if(method === "0") await this.orderService.create({...dataOrder, user_id});
        if(method === "1") await this.orderService.orderCoffee({...dataOrder, user_id});
        const responseOrderCoffee: IOrderCoffeeResponse = { 
            success: true,
            mes: "order successfully"
        }
        res.json(responseOrderCoffee)
    }

    @Get(Endpoint.GET_ORDER_BY_ID) 
    @HttpCode(HttpStatus.OK)
    async getOrderById(@Param("id") id: Id, @Res() res: Response) {
        const response = {
            success: true,
            mes: "get Order Successfully",
            order: await this.orderService.findById(id)
        }
        res.json(response);
    }

    @Get(Endpoint.GET_ALL_ORDER)
    @HttpCode(HttpStatus.OK)
    async getAllOrders(@Query() query: any, @Res() res: Response): Promise<void> { 
        const [
            total,
            totalCancled,
            totalPaid,
            totalSuccess,
            totalOrdered,
            total1Month,
            total1Week,
            total2Week,
            total3Week,
            total4Week,
            total5Week
        ] = await Promise.all (
            [
                this.orderService.getTotal(),
                this.orderService.getTotal(Status.CANCLED),
                this.orderService.getTotal(Status.PAID),
                this.orderService.getTotal(Status.RECEIVED_ORDER),
                this.orderService.getTotal(Status.ORDERED),
                this.orderService.calculateTotalRevenueLastWeeks(),
                this.orderService.calculateTotalRevenueLastWeeks(1),
                this.orderService.calculateTotalRevenueLastWeeks(2),
                this.orderService.calculateTotalRevenueLastWeeks(3),
                this.orderService.calculateTotalRevenueLastWeeks(4),
                this.orderService.calculateTotalRevenueLastWeeks(5),
            ]
        )
        const getAllOrdersResponse: IGetAllOrders = { 
            success: true,
            mes: "All orders have been successfully received",
            allOrders: !query ? await this.orderService.findAll()
            : await this.orderService.getAllORderPage(query),
            total: total,
            totalCancled: totalCancled,
            totalPaid: totalPaid,
            totalSuccess: totalSuccess,
            totalOrdered: totalOrdered,
            total1Month: total1Month,
            total1Week: total1Week,
            total2Week: total2Week,
            total3Week: total3Week,
            total4Week: total4Week,
            total5Week: total5Week
        }
        res.json(getAllOrdersResponse);
    }

    @Patch(Endpoint.RECEIVED_ORDER)
    @HttpCode(HttpStatus.OK)
    async received(@Param("id") id: Id, @Res() res: Response): Promise<any> { 
        await this.orderService.update(id, {status: Status.RECEIVED_ORDER})
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
            allOrders: await this.orderService.getAllOrderUserLogin({user_id: id})
        }   
        res.json(response);
    }

    @Patch(Endpoint.CANCLE_ORDER)
    @HttpCode(HttpStatus.OK)
    async cancleOrder(@Req() req: Request, @Param("id") id_order: Id, @Res() res: Response): Promise<void> { 
        await this.orderService.cancleOrder(id_order);
        const response = { 
            success: true,
            mes: "đã hủy đơn hàng thành công"
        }
        res.json(response);
    }

    @Patch(Endpoint.CANCLE_ORDER_DIRECT)
    @HttpCode(HttpStatus.OK)
    async cancleOrderDirect(@Param("id") id_order: any, @Res() res: Response) { 
        await this.orderService.update(id_order, {status: Status.CANCLED})
        const response = { 
            success: true,
            mes: "đã hủy đơn hàng thành công"
        }
        res.json(response)
    }
}