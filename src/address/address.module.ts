import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Address, AddressShema } from "./schema/address.schema";
import { AddressRepository } from "./address.repository";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";

@Module({
    imports : [
        MongooseModule.forFeature([{name: Address.name, schema: AddressShema}])
    ],
    controllers: [AddressController],
    providers: [AddressRepository, AddressService],
    exports: []

})
export class AddressModule {
}