import { IBaseReponse } from "src/common/interfaces/base.response.interface";
import { ICategory } from "../category.interface";

export interface IGetAllCategory extends IBaseReponse { 
    allCategory: ICategory[]
}