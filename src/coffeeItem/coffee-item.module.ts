import { Module } from "@nestjs/common";
import { CoffeeItemRepository } from "./coffee-Item.repository";
import { CoffeeItemService } from "./coffee-Item.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CoffeeItem, CoffeeItemSchema } from "./schema/coffee-Item.schema";
import { CoffeeitemController } from "./coffee-item.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CoffeeItem.name, schema: CoffeeItemSchema }])
    ],
    controllers: [CoffeeitemController],
    providers: [CoffeeItemService, CoffeeItemRepository],
    exports: [CoffeeItemRepository, CoffeeItemService]
})
export class CoffeeItemModule { 
}