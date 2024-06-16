import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { IAddress } from "../address.interface";

export interface IGetAllAddress extends IBaseReponse {
    allAddress: IAddress[]
}