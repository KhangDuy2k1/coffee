import {Get, Body, Controller, HttpCode, HttpStatus, Post, Put, Res, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { CreateWalletDto } from "./dtos/create-wallet.dto";
import { Types } from "mongoose";
import { WalletService } from "./wallet.service";
import { ConfictException } from "src/common/exceptions/exception";
import { CreateWallet } from "./interfaces/responses/create-wallet.interface";
import { ITopUp } from "./interfaces/responses/top-up.interface";
type Id = Types.ObjectId;
@Controller("wallet")
export class WalletControler { 
    constructor(private walletService: WalletService){}
    @Post(Endpoint.CREATE_WALLET)
    @HttpCode(HttpStatus.CREATED)
    async createWallet(@Req() req: Request, @Res() res: Response): Promise<void> { 
        const id_user: Id = req["user"]["_id"];
        await this.walletService.createWallet(id_user);
        const createWallet: CreateWallet = {
            success: true,
            mes: "create wallet successfully"
        }
        res.json(createWallet);
    }

    @Get(Endpoint.GET_WALLET_USER_LOGIN)
    @HttpCode(HttpStatus.OK)
    async getWallet(@Req() req: Request, @Res() res: Response){
        const id_user = req["user"]["_id"];
        const wallet = await this.walletService.getWallet(id_user);
        res.json({ 
            success: true,
            mes: "lấy ví thành công",
            wallet: wallet
        })
    }

    @Put(Endpoint.TOP_UP_TO_WALLET)
    @HttpCode(HttpStatus.OK)
    async topUp(@Req() req: Request, @Res() res: Response, @Body("amountWantToAdd") amountWantToAdd: string ): Promise<any> { 
        const {_id} = req["user"];
        await this.walletService.topUp( _id, parseInt(amountWantToAdd))
        const response: ITopUp = {
            success: true,
            mes: "add money successfully"
        }
        res.json(response);
    }
}