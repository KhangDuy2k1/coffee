import { IUser } from "../user.interface";
import { IBaseReponse } from "../../../common/interfaces/base.response.interface";

export interface IGetUserLogin extends IBaseReponse { 
        user: IUser
}