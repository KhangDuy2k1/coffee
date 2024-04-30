import { ForbiddenException, Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { IUser } from "./interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schema/user.schema";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { ICoffeeItem } from "src/coffeeItem/interfaces/coffee-item.interface";
import { CoffeeItemRepository } from "src/coffeeItem/coffee-Item.repository";
type Id = Types.ObjectId;
@Injectable()
export class UserRepository implements Repository<IUser>{
     constructor(@InjectModel(User.name) private userModel: Model<User>, private coffeeRepository: CoffeeItemRepository){}
       async findOne(id: Id):Promise<IUser> {
           return 
        }
       async findById(id: Id): Promise<IUser> {
        try {
            return await this.userModel.findById(id);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
           
       } 
       
       async findEmailOrPhonenumber(dataUser: UpdateUserDto): Promise<any> {
          try {
            return await this.userModel.find({
            $or: [
            {
                email: dataUser["email"],
            },
            {
                phonenumber: dataUser["phonenumber"]
            }
            ] 
            })
          } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
          }
       }

       async findAll(): Promise<IUser[]> {
        try {
            return await this.userModel.find();   
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
        }
       async update(id: Id, data: any): Promise<void> {
        try {
            await this.userModel.findByIdAndUpdate(id, data);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
        }

       async create(data: any): Promise<IUser> {
        try {
            return await this.userModel.create(data);
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
            
       }

       async delete(id: Id): Promise<any> {
            try {
                return await this.userModel.deleteOne({_id: id})
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
      
        }
        async findEmail(email: string): Promise<IUser>{
            try {
                return await this.userModel.findOne({email: email});
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
       }

       async getCoffeeLiked(coffeesLiked: Id[]): Promise<ICoffeeItem[]> { 
            try {
             return await Promise.all(coffeesLiked.map((coffeeId)  => { 
                        return this.coffeeRepository.findById(coffeeId);
                }))
            } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
            }
       }


}