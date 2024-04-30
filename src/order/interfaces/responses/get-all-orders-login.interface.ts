import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { IOrder } from "../order.interface";

export interface IGetAllOrdersUser extends IBaseReponse { 
    allOrders: IOrder[]
}