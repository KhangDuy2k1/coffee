import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { IOrder } from "../order.interface";

export interface IGetAllOrders extends IBaseReponse {
    allOrders: IOrder[],
    total: number,
    totalSuccess: number,
    totalOrdered: number,
    totalCancled: number,
    totalPaid: number,
    total1Week: any,
    total2Week: any,
    total3Week: any,
    total4Week: any,
    total5Week: any,
    total1Month: any
}