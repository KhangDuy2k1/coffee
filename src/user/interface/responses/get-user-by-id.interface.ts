import { IUser } from "../user.interface";
import { IBaseReponse } from "../../../common/interfaces/base.response.interface";

export interface IGetUserById extends IBaseReponse {
    user: IUser;
}