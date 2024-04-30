import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { IOrder } from "./interfaces/order.interface";
import { OrderRepository } from "./order.repository";
import { Types } from "mongoose";
import { WalletService } from "src/wallet/wallet.service";
import { ConfictException } from "src/common/exceptions/exception";
type Id = Types.ObjectId;
@Injectable()
export class OrderServie extends BaseService<IOrder, OrderRepository>{
        constructor(private orderRepository: OrderRepository, private walletService: WalletService){
                super(orderRepository);
        }
        async orderCoffee({id_user, total, coffeeitem_id, quantity}): Promise<void> {  
            await this.walletService.deductMoney(id_user, total),
            await this.orderRepository.create({id_user, total, coffeeitem_id, quantity})
        }

        async cancleOrder(id_user: Id, id_order: Id): Promise<void> { 
          let checkStatus: boolean = await this.checkStatusOrderCancle(id_order);
          if(checkStatus) throw new ConfictException("The order was previously canceled")
          await this.orderRepository.update(id_order, { status: "Đã hủy đơn"})
          let totalMoney: number = await this.getTotalMoneyOrder(id_order);
          await this.walletService.topUp(id_user, totalMoney);
        }


        async checkStatusOrderCancle(id_order: Id): Promise<boolean> { 
            const order: IOrder = await this.orderRepository.findById(id_order);
            return order["status"] === "Đã hủy đơn"
        }

        
        async getTotalMoneyOrder(id_order: Id): Promise<number> {
            const order: IOrder = await this.orderRepository.findById(id_order);
            return order["total"];
        }
}