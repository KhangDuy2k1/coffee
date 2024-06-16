import { Injectable } from "@nestjs/common";
import { ICoffeeItem } from "./interfaces/coffee-item.interface";
import { InjectModel } from "@nestjs/mongoose";
import { CoffeeItem } from "./schema/coffee-Item.schema";
import { Model, Types } from "mongoose";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { CreateCoffeeDto } from "./dtos/create-coffee.dto";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
type Id = Types.ObjectId
@Injectable()
export class CoffeeItemRepository implements Repository<ICoffeeItem> {
    constructor(@InjectModel(CoffeeItem.name) private coffeeItemModel: Model<CoffeeItem>){}
    async create(data: CreateCoffeeDto): Promise<any> {
    try {
        const newCoffee = new this.coffeeItemModel(data);
        await newCoffee.save()
    } catch (error) {
        throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
    }
    }
    async findById(id: Id): Promise<ICoffeeItem> {
        try {
           return await this.coffeeItemModel.findOne({_id: id});
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    };
    async findAll(): Promise<ICoffeeItem[]> {
        try {
            return await this.coffeeItemModel.find();
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    };
    async update(id: Id, data: any): Promise<void> {
        try {
            await this.coffeeItemModel.updateOne({_id: id}, data);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    };
    async delete(id: Id): Promise<void> {
        try {
            await this.coffeeItemModel.deleteOne({_id: id});
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    };
    async getCoffeePage(query: any): Promise<any[]> {
        const {page, numberPage} = query;
        const skip = (page - 1)*numberPage
        try {
            return await this.coffeeItemModel.find()
            .skip(skip)
            .limit(numberPage)
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
}