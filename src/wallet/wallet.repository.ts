import { Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { IWallet } from "./interfaces/wallet.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Wallet } from "./schema/wallet.schema";
import { Model, Types } from "mongoose";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
type Id = Types.ObjectId
@Injectable()
export class WalletRepository implements Repository<IWallet>{ 
    constructor(@InjectModel(Wallet.name) private walletModel : Model<Wallet>){}
        async create(data?: any): Promise<any> {
            try {
                await this.walletModel.create(data);
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
        }
        async update(id: Id, data: any): Promise<void> {
            try {
                await this.walletModel.updateOne({id_user: id}, data);
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
        }
        async delete(id: Id): Promise<any> {
            try {
                await this.walletModel.deleteOne({_id : id})
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
        }
        async findById(id: Id): Promise<IWallet> {
            try {
               return await this.walletModel.findById(id);
            } catch (error) {
               throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
        }
        async findAll(conditions?: any): Promise<IWallet[]> {
            try {
                return await this.walletModel.find(conditions);
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
        }
        async findWallet(id_user: Id): Promise<IWallet> { 
            try {
                return await this.walletModel.findOne({id_user: id_user});
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
        }
}