import { IBaseReponse } from "../../../common/interfaces/base.response.interface";
import { IUser } from "../user.interface";

export interface IGetAllUser extends IBaseReponse { 
    allUser: IUser[];
    totalUsers: number;
    totalUsersBlocked: number;
    totalUsersActive: number
}