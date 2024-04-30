import { ICoffeeItem } from "src/coffeeItem/interfaces/coffee-item.interface";
import { IBaseReponse } from "src/common/interfaces/base.response.interface";

export interface IGetCoffeeLiked extends IBaseReponse { 
    coffeesLiked: ICoffeeItem[]
}