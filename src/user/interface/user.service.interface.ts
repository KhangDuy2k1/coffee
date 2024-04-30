import { CrudService } from "src/common/interfaces/base.service.interface";
import { IUser } from "./user.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginDto } from "../dtos/login.dto";
import { Types } from "mongoose";
type Id = Types.ObjectId
export interface IUserService extends CrudService<IUser> {
    register(dataUser: CreateUserDto): Promise<any>;
    login(dataUserLogin: LoginDto): Promise<any>;
    updateUser(id: Id, data: any): Promise<any>;
    likeCoffee(id_coffee: Id, id_user: Id): Promise<any>;
    unlikeCoffee(id_coffee: Id, user: IUser): Promise<any>
}