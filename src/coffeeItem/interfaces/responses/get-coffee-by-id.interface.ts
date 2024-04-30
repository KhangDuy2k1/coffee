import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { ICoffeeItem } from "../coffee-item.interface";

export interface IGetCoffeeById extends IBaseReponse { 
    CoffeeByid: ICoffeeItem
}