import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { IWallet } from "./interfaces/wallet.interface";
import { WalletRepository } from "./wallet.repository";
import { ConfictException, PaymentRequiredException } from "src/common/exceptions/exception";
import { Types } from "mongoose";
type Id = Types.ObjectId;
@Injectable()
export class WalletService extends BaseService<IWallet, WalletRepository>{ 
        constructor(private walletRepository: WalletRepository){
                super(walletRepository);
        }
        private async checkWalletExist(id_user: Id): Promise<boolean> { 
            const wallet = await this.walletRepository.findWallet(id_user);
            return !!wallet
        }

        async createWallet(id_user: Id): Promise<void> {
            const check: boolean = await this.checkWalletExist(id_user);
            if(check) throw new ConfictException("Wallet arealdy exist");
            await this.walletRepository.create({id_user: id_user});
        }

        async topUp(id_user: Id, amountWantToAdd: number): Promise<void> { 
            const check: boolean = await this.checkWalletExist(id_user);
            if(!check) throw new NotFoundException("wallet not found");
            const amountMoneyUser: number = await this.getAmountMoney(id_user);
            console.log(amountMoneyUser);
            const newAmountMoney: number = this.amountAfterAdding(amountMoneyUser , amountWantToAdd);
            await this.updateAmountMoney(newAmountMoney, id_user);
        }

        async deductMoney(id_user: Id, 
            moneyDeductionAmount: number): Promise<void> { 
            const check: boolean = await this.checkWalletExist(id_user);
            if(!check) throw new NotFoundException("wallet not found");
            const amountMoneyUser: number = await this.getAmountMoney(id_user);
            const checkMoney: boolean = this.checkMoney(amountMoneyUser, moneyDeductionAmount);
            if(!checkMoney) throw new PaymentRequiredException("the amount is not enough")
            const newAmountMoney: number = this.amountAfterDeduction(amountMoneyUser, moneyDeductionAmount);
            await this.updateAmountMoney(newAmountMoney, id_user);
        }

        private amountAfterAdding(amountMoney: number, amountWantToAdd: number): number { 
            return amountMoney + amountWantToAdd;
        }

        private amountAfterDeduction(amountMoney: number, amountMoneyDeduct: number): number { 
            return amountMoney - amountMoneyDeduct;
        }

        private async getAmountMoney(id_user: Id): Promise<any> { 
            const wallet: IWallet = await this.walletRepository.findWallet(id_user);
            return wallet['amountMoney'];
        }

        private async updateAmountMoney(newAmountMoney: number, id_user: Id): Promise<void> { 
            await this.walletRepository.update(id_user, {amountMoney: newAmountMoney});
        }

        private checkMoney(amountMoney: number, amountMoneyDeduct: number):boolean {
            return amountMoney > amountMoneyDeduct;
        }
       

}