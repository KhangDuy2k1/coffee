import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { IAddress } from "./interfaces/address.interface";
import { AddressRepository } from "./address.repository";

@Injectable()
export class AddressService extends BaseService<IAddress, AddressRepository> { 
    constructor(private addressRepository: AddressRepository){
        super(addressRepository); 
    }
}