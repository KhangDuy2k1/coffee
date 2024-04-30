import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wallet, WalletSchema } from "./schema/wallet.schema";
import { WalletControler } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { WalletRepository } from "./wallet.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Wallet.name, schema: WalletSchema}
        ])
    ],
    controllers: [WalletControler],
    providers: [WalletService, WalletRepository],
    exports : [WalletService]
})
export class WalletModule { 
}