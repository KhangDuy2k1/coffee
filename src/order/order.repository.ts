import { Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { IOrder } from "./interfaces/order.interface";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./schema/order.schema";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
type Id = Types.ObjectId;
@Injectable()
export class OrderRepository implements Repository<IOrder> {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>){}
    async create(data: any): Promise<any> {
        try {
            const newOder = new this.orderModel(data);
            await newOder.save();
        } catch (error) {
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
           return await this.orderModel.findOne({_id: id})
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
}
