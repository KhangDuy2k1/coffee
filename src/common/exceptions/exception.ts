import { HttpException, HttpStatus } from "@nestjs/common";

class BaseException extends HttpException {
    constructor(err: string, status: number){
        super({success: false ,status: status, error: err}, status);
    }
}
export class ForbidenException extends BaseException {
        constructor(err: string){
                super(err, HttpStatus.FORBIDDEN)
        }
}
export class ServerErrorException extends BaseException {
        constructor(err: string){
            super(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
}
export class ConfictException extends BaseException {
        constructor(err: string){
            super(err, HttpStatus.CONFLICT)
        }
}
export class UnauthorizedException extends BaseException { 
        constructor(err: string){
            super(err ,HttpStatus.UNAUTHORIZED);
        }
}
export class NotFoundException extends BaseException { 
        constructor(err: string){
            super(err, HttpStatus.NOT_FOUND)
        }
}
export class PaymentRequiredException extends BaseException { 
        constructor(err: string){
            super(err, HttpStatus.PAYMENT_REQUIRED);
        }
        
}