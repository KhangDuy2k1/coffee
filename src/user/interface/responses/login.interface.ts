import { IBaseReponse } from "../../../common/interfaces/base.response.interface";
import { IUser } from "../user.interface";

export interface ILoginResponse extends IBaseReponse { 
        accessToken: string,
        refreshToken: string,
        user: IUser      
}