import { ForbiddenException, Injectable, NestMiddleware, NestModule, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction  } from "express";
import { JwtHelper } from "../helpers/jwt.helpers";
import { JwtContant } from "../constants/jwt.constant";
import { IPayload } from "src/user/interface/payload-jwt.interface";
import { UserRepository } from "src/user/user.repository";
import { IUser } from "src/user/interface/user.interface";
import { Types } from "mongoose";
@Injectable()
export class AuthMiddlewate implements NestMiddleware { 
    constructor(private jwtHelper: JwtHelper, private userRepository: UserRepository){}
   
    async use(req: Request, res: Response, next: NextFunction): Promise<any>{
        if(!req["headers"]["authorization"]) throw new UnauthorizedException("token isn't sent")
        if(!req["headers"]["authorization"].startsWith("Bearer")) throw new UnauthorizedException("Wrong format Authorization");
        const token = req["headers"]["authorization"].split(" ")[1];
        const payload: IPayload = await this.jwtHelper.verifyJwt(token, JwtContant.SECRET_ACCESSTOKEN)
        const id_user: Types.ObjectId = payload["id"];
        const user: IUser =await this.userRepository.findById(id_user);
        req["user"] = user;
        next();       
    }
}
export class VerifyAdminMiddlewate implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
       const user: IUser = req["user"];
       if(user["role"] !== "admin") throw new ForbiddenException("you aren't administrator")  
       next()
    }
}