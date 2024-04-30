import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { IUser } from "./interface/user.interface";
import { UserRepository } from "./user.repository";
import { IUserService } from "./interface/user.service.interface";
import { ConfictException, NotFoundException, ServerErrorException } from "src/common/exceptions/exception";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtHelper } from "src/common/helpers/jwt.helpers";
import { IPayload } from "./interface/payload-jwt.interface";
import { LoginDto } from "./dtos/login.dto";
import { Types } from "mongoose";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { IUpdateUserRes } from "./interface/responses/update-user.interface";
import { Message } from "src/common/constants/message.constant";
import { CoffeeItemRepository } from "src/coffeeItem/coffee-Item.repository";
import { ICoffeeItem } from "src/coffeeItem/interfaces/coffee-item.interface";
type Id = Types.ObjectId
@Injectable()
export class UserService extends BaseService<IUser, UserRepository> implements IUserService{
    constructor(protected userRepository: UserRepository, private jwtHelper: JwtHelper, private coffeeRepository: CoffeeItemRepository){
        super(userRepository);
    }

    private async verifyPassword(password: string, passwordHash: string ): Promise<boolean> { 
            return bcrypt.compare(password, passwordHash);
    }

    private async verifyEmailExistence(email: string): Promise<boolean> {
        const response: IUser = await this.userRepository.findEmail(email);
        return !!response
    }
    
    private removeCoffee(coffee_liked:Id[], id_remove:Id): Id[] {
      const index: number = coffee_liked.indexOf(id_remove); 
      return coffee_liked.splice(index, 1);
    }

    async register(dataUserRegister: CreateUserDto): Promise<any> {
        const email: string = dataUserRegister.email;
        const existEmail: boolean = await this.verifyEmailExistence(email);
        if(existEmail){
            throw new ConfictException("Email already exists");
        }
        return this.userRepository.create(dataUserRegister);
    }
    async login(dataUserLogin: LoginDto): Promise<any> {
        const {email, password} = dataUserLogin;
        const existEmail: boolean = await this.verifyEmailExistence(email);
        if(!existEmail){
            throw new UnauthorizedException("Email is incorect");
        }else {
            const user:IUser = await this.userRepository.findEmail(email);
            const passwordHash: string = user.password;
            const checkPassword: boolean = await this.verifyPassword(password, passwordHash);
            if(!checkPassword){
                throw new UnauthorizedException("Password is incorect");
            }else {
                const payload: IPayload = {
                    id: user["_id"]
                }
                return {
                   accessToken: await this.jwtHelper.generateAccessToken(payload),
                   refreshToken: await this.jwtHelper.generateRefreshToken(payload),
                   user: user
            }
        }
    }
}
    async updateUser(id: Id, data: UpdateUserDto): Promise<any> {
        const user: IUser | null =await this.userRepository.findEmailOrPhonenumber(data)
        if(user) throw new ConfictException("email or phonenumber aready exists")
        await this.userRepository.update(id, data);
    }

    async likeCoffee(id_coffee: Id, id_user: Id): Promise<any> {
        const [user, coffee] = await Promise.all(
            [
                this.userRepository.findById(id_user),
                this.coffeeRepository.findById(id_coffee)
            ])
        if(!coffee) throw new NotFoundException("id_coffee not found");
        const { likedCoffeeItem } = user;
        if(likedCoffeeItem.includes(id_coffee)) throw new ConfictException("coffee aready liked")
        likedCoffeeItem.push(id_coffee)
        try {
            await user.save()
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }

    async unlikeCoffee(id_coffee: Id, user: IUser): Promise<any> {
        const coffee= await this.coffeeRepository.findById(id_coffee);
        if(!coffee) throw new NotFoundException("id_coffee not found");
        const { likedCoffeeItem } = user;
        if(!likedCoffeeItem.includes(id_coffee)) throw new NotFoundException("coffee isn't yet popular");
        const newLikedCoffeeItem: Id[] = this.removeCoffee(likedCoffeeItem, id_coffee)
        user["likedCoffeeItem"]= newLikedCoffeeItem;
        try {
           await user.save();
        } catch (error) {
            throw new ServerErrorException(Message.SERVER_ERROR_MESSAGE);
        }
    }
    
    async getCoffeeLiked(coffeesLiked: Id[]): Promise<ICoffeeItem[]> { 
        return this.userRepository.getCoffeeLiked(coffeesLiked);
    }
}
