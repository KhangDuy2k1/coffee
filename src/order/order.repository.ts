import { Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { IOrder } from "./interfaces/order.interface";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./schema/order.schema";
import { ConfictException, ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
import { Status } from "src/common/constants/status.constant";
type Id = Types.ObjectId;
@Injectable()
export class OrderRepository implements Repository<IOrder> {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>){}
    async create(data: any): Promise<any> {
        try {
            if(data.quantity == 0){
                throw new Error("1");
            }
            const newOder = new this.orderModel(data);
            await newOder.save();
        } catch (error) {
            if(error.message === "1"){
                throw new ConfictException("bạn chưa nhập số lượng");
            }
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async delete(id: Id): Promise<any> {
        try {
            await this.orderModel.deleteOne({_id: id});
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async update(id: Id, data: any): Promise<void> {
        try {
            await this.orderModel.updateOne({_id: id}, data);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async findById(id: Id): Promise<IOrder> {
        try {
           return await this.orderModel.findOne({_id: id}).populate("id_address").populate("coffeeItem_id")
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async findAll(conditions?: any): Promise<IOrder[]> {
        try {
            return await this.orderModel.find(conditions);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async getAllOrderUserLogin(conditions?: any): Promise<any> { 
        try {
            return await this.orderModel.find(conditions)
            .populate("coffeeItem_id")
            .populate("id_address")
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);   
        }
    }
    async getAllOrderPage(query: any) { 
        const {page, numberPage} = query;
        const skip: number = (page - 1)*numberPage
        try {
            return await this.orderModel.find()
            .populate("coffeeItem_id")
            .populate("id_address")
            .skip(skip)
            .limit(numberPage)
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);   
        }
    }

    async getTotal(status?: any) { 
        try {
            if(status)  return await this.orderModel.countDocuments({status: status});
            return await this.orderModel.countDocuments();
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);   
        }
    }

    async calculateTotalRevenueLastWeeks(weeksAgo?: number): Promise<any> {
        const setDay = (weeksAgo: number) => { 
            const dayAgo = new Date();
            dayAgo.setDate(dayAgo.getDate() - 7*weeksAgo);
            return dayAgo;
        }
        
        try {
                const result = await this.orderModel.aggregate([
                    weeksAgo ? 
                    {
                        $match: {
                            status: Status.RECEIVED_ORDER, 
                            createdAt: {
                                $gte: setDay(weeksAgo),
                                $lt: setDay(weeksAgo-1)
                            }
                        }
                    } :
                    {
                        $match: {
                            status: Status.RECEIVED_ORDER, 
                            createdAt: {
                                $gte: setDay(4),
                            }
                        }
                    }
                    ,
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: "$total" }, 
                            totalOrders: { $sum: 1 }
                        }
                    }
                ]);
                return result.length > 0 ? result[0] : { totalRevenue: 0, totalOrders: 0 };
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
}
