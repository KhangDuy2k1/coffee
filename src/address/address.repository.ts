import { Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { IAddress } from "./interfaces/address.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Address } from "./schema/address.schema";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";

@Injectable()
export class AddressRepository implements Repository<IAddress> { 
    constructor(@InjectModel(Address.name) private addressModel: Model<Address>) { 
    }
    async create(data: any): Promise<any> {
        try {
            await this.addressModel.create(data); 
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async update(id: Types.ObjectId, data: any): Promise<void> {
        try {
            await this.addressModel.updateOne({_id: id}, data);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async delete(id: Types.ObjectId): Promise<any> {
        try {
            await this.addressModel.deleteOne({_id: id});
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    async findAll(conditions?: any): Promise<IAddress[]> {
        try {
            return await this.addressModel.find(conditions);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            
        }
    }
    async findById(id: Types.ObjectId): Promise<IAddress> {
        try {
            return await this.addressModel.findById(id);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
}