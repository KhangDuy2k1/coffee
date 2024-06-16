import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { IOrder } from "./interfaces/order.interface";
import { OrderRepository } from "./order.repository";
import { Types } from "mongoose";
import { WalletService } from "src/wallet/wallet.service";
import { ConfictException } from "src/common/exceptions/exception";
import { Status } from "src/common/constants/status.constant";
type Id = Types.ObjectId;
@Injectable()
export class OrderServie extends BaseService<IOrder, OrderRepository>{
        constructor(private orderRepository: OrderRepository, private walletService: WalletService){
                super(orderRepository);
        }
        async orderCoffee({user_id, total, coffeeItem_id, quantity, id_address}): Promise<void> {  
            await this.walletService.deductMoney(user_id, total),
            await this.orderRepository.create(
                {
                 user_id,
                 status: Status.PAID,
                 total,
                 coffeeItem_id,
                 quantity,
                 id_address
                })
        }

        async getAllOrderUserLogin({user_id}){ 
            return this.orderRepository.getAllOrderUserLogin({user_id})
        }

        async cancleOrder(id_order: Id): Promise<void> { 
          let checkStatus: boolean = await this.checkStatusOrderCancle(id_order);
          if(checkStatus) throw new ConfictException("The order was previously canceled")
          await this.orderRepository.update(id_order, { status: Status.CANCLED})
          const order: IOrder = await this.orderRepository.findById(id_order);
          const {user_id, total} = order;
          await this.walletService.topUp(user_id, total);
        }

        async getAllORderPage(query: any) { 
            return this.orderRepository.getAllOrderPage(query)
        }

        async getTotal(status?: any) { 
            return this.orderRepository.getTotal(status);
        }

        async calculateTotalRevenueLastWeeks(weeksAgo?: number) { 
            return this.orderRepository.calculateTotalRevenueLastWeeks(weeksAgo);
        }

        async checkStatusOrderCancle(id_order: Id): Promise<boolean> { 
            const order: IOrder = await this.orderRepository.findById(id_order);
            return order["status"] === Status.CANCLED
        }
}