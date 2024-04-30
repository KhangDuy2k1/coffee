import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { ICoffeeItem } from "../coffee-item.interface";

export interface IGetAllCoffee extends IBaseReponse { 
    allCoffee: ICoffeeItem[]
}