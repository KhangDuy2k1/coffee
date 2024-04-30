import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtContant } from "../constants/jwt.constant";
import { IPayload } from "src/user/interface/payload-jwt.interface";
@Injectable()
export class JwtHelper {
    constructor(private jwtService : JwtService){}
    async generateAccessToken(payload: any): Promise<any> {
        return this.jwtService.signAsync(
            payload, 
            {
                secret: JwtContant.SECRET_ACCESSTOKEN, 
                expiresIn : JwtContant.EXPIRESIN_ACCESSTOKEN
            }); 
    }
    async generateRefreshToken(payload: any): Promise<any> { 
        return this.jwtService.signAsync(payload, 
            {
                secret: JwtContant.SECRET_REFRESHTOKEN,
                expiresIn: JwtContant.EXPIRESIN_REFRESHTOKEN
            });
    }
    async verifyJwt(token: string, secretKey: string): Promise<IPayload> {
        try {
            return await this.jwtService.verifyAsync<IPayload>(token, {secret: secretKey});
        } catch (error) {
           const errorMessage: string = error['message'];
           throw new ForbiddenException(errorMessage);
        } 
    }
}