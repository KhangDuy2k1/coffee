import { Injectable, HttpException, ForbiddenException } from "@nestjs/common";
import { Repository } from "src/common/interfaces/base.repository.interface";
import { ICategory } from "./interface/category.interface";
import { Category, CategorySchema } from "./schema/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { ServerErrorException } from "src/common/exceptions/exception";
import { Message } from "src/common/constants/message.constant";
type Id = Types.ObjectId
@Injectable()
export class CategoryRepository implements Repository<ICategory>  { 
        constructor(@InjectModel(Category.name) private categoryModel: Model<Category>){
        }
        async findById(id: Id): Promise<ICategory> {
              try {
                return await this.categoryModel.findOne({_id: id})
              } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
              }
        }
        async delete(id: Id): Promise<any> {
          try {
             await this.categoryModel.deleteOne({_id: id});
          } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
          }
        }

        async create(data: CreateCategoryDto): Promise<void> {
          try {
            const newCategory = new this.categoryModel(data)
            await newCategory.save()
          } catch (error) {
             throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
          }   
        }

        async update(id: Id, data: any): Promise<any> {
              try {
                await this.categoryModel.updateOne({_id: id}, data);
              } catch (error) {
                throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
              }
        }
        async findAll(): Promise<ICategory[]> {
             try {
              return await this.categoryModel.find()
             } catch (error) {
               throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
             }
        }
}