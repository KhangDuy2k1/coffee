import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { IOrder } from "../order.interface";

export interface IGetAllOrders extends IBaseReponse {
    allOrders: IOrder[]
}