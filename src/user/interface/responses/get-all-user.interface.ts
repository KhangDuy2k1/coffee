import { IBaseReponse } from "../../../common/interfaces/base.response.interface";
import { IUser } from "../user.interface";

export interface IGetAllUser extends IBaseReponse { 
    allUser: IUser[];
}