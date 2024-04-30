import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schema/order.schema";
import { OrderController } from "./order.controller";
import { OrderServie } from "./order.service";
import { OrderRepository } from "./order.repository";
import { WalletModule } from "src/wallet/wallet.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
        WalletModule
    ],
    controllers: [OrderController],
    providers: [OrderServie, OrderRepository],
    exports: []
})
export class OrderModule {
}