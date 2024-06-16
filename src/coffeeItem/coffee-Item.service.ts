import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { ICoffeeItem } from "./interfaces/coffee-item.interface";
import { CoffeeItemRepository } from "./coffee-Item.repository";

@Injectable() 
export class CoffeeItemService extends BaseService<ICoffeeItem,CoffeeItemRepository> { 
    constructor(private coffeeItemRepository: CoffeeItemRepository){
        super(coffeeItemRepository)
    }
    async getCoffeePage(query: any): Promise<any[]> {
        return this.coffeeItemRepository.getCoffeePage(query);
    }
}