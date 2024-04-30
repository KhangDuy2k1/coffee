import { 
  Body,
  Get,
  Post,
  Res,
  Req,
  HttpCode,
  Controller, 
  Param,
  Delete,
  Patch,
  Put,
  HttpStatus
} from "@nestjs/common";
import { Response, Request } from "express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { IRegisterResponse } from "./interface/responses/register.interface";
import { LoginDto } from "./dtos/login.dto";
import { ILoginResponse } from "./interface/responses/login.interface";
import { IGetAllUser } from "./interface/responses/get-all-user.interface";
import { IGetUserById } from "./interface/responses/get-user-by-id.interface";
import { Types } from "mongoose";
import { IGetUserLogin } from "./interface/responses/get-user-login.interface";
import { IDeleteUser } from "./interface/responses/delete-user.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { IUpdateUserRes } from "./interface/responses/update-user.interface";
import { Endpoint } from "src/common/constants/endpoint.constant";
import { ILikeCoffee } from "./interface/responses/like-coffee.interface";
import { IUser } from "./interface/user.interface";
import { IUnlikeCoffee } from "./interface/responses/unlike-coffee.interface";
import { IGetCoffeeLiked } from "./interface/responses/get-coffee-liked.interface";
type Id = Types.ObjectId
@Controller("user")
export class UserController {
  constructor(private userService: UserService){};
  @Post(Endpoint.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  async test(@Body() userCreate: CreateUserDto, @Res() res: Response): Promise<void> {
  const data = await this.userService.register(userCreate);
  const registerResponse: IRegisterResponse = { 
      success: true,
      mes: "Registered Successfully",
      user: data
  }
  res.json(registerResponse);
  }


  
  @Get(Endpoint.GET_COFFEE_LIKED)
  async getCoffeeLiked(@Req() req: Request, @Res() res: Response): Promise<void> { 
      const coffeesLiked: Id[] = req["user"]["likedCoffeeItem"];
      const getCoffeesLikedResponse: IGetCoffeeLiked = { 
        success: true,
        mes: "get coffee liked successfully",
        coffeesLiked: await this.userService.getCoffeeLiked(coffeesLiked)
      }
      res.json(getCoffeesLikedResponse);
  }


  @Post(Endpoint.LOGIN)
  @HttpCode(HttpStatus.OK)
  async log(@Body() userLogin: LoginDto, @Res() res: Response): Promise<void> {
    const data = await this.userService.login(userLogin)
    const loginResponse: ILoginResponse = { 
      success: true,
      mes: "Login successfully",
      accessToken: data["accessToken"],
      refreshToken: data["refreshToken"],
      user: data["user"]
    }
    res.json(loginResponse);
  }

  @Get(Endpoint.ALL_USER)
  @HttpCode(HttpStatus.OK)
  async getAllUser(@Req() req: Request, @Res() res: Response): Promise<void> { 
    const resGetAllUser: IGetAllUser = {
      success: true,
      mes: "Get all users successfully",
      allUser: await this.userService.findAll()
    }
    res.json(resGetAllUser)
  }

  @Get(Endpoint.FIND_USER_LOGIN)
  @HttpCode(HttpStatus.OK)
  getUserLogin(@Req() req: Request, @Res() res: Response){
    const resGetUserLogin: IGetUserLogin = {
      success: true,
      mes: "Get all users successfully",
      user: req["user"]
    }
    res.json(resGetUserLogin)
  }

  @Delete(Endpoint.DELETE_USER)
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param("id") id: Id, @Res() res: Response): Promise<any>{
     await this.userService.delete(id);
     const deleteUserResponse: IDeleteUser = { 
      success: true,
      mes: "delete user successfully",
     }
     res.json(deleteUserResponse);
  }

  @Put(Endpoint.UPDATE_USER) 
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param("id") id: Id, @Body() dataUser: UpdateUserDto, @Res() res: Response): Promise<void> { 
  await this.userService.updateUser(id, dataUser)
    const response: IUpdateUserRes = { 
      success: true,
      mes: "Update user successfully",
    }
    res.json(response);
  }

  @Get(Endpoint.FIND_USER_BY_ID)
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param("id") id: Id, @Res() res: Response): Promise<void> {
    const response: IGetUserById = {
      success: true, 
      mes: "Get user successfully",
      user: await this.userService.findById(id)
    }
    res.json(response)
  }

  @Patch(Endpoint.LIKE_COFFEE)
  @HttpCode(HttpStatus.CREATED)
  async likeCoffee(@Req() req: Request, @Param("id") id: Id, @Res() res: Response): Promise<void> {
    console.log("hello");
      const id_user: Id = req["user"]["_id"];
      console.log(id_user);
      await this.userService.likeCoffee(id, id_user);
      const likeCoffeeResponse: ILikeCoffee = { 
        success: true,
        mes: "like coffee successfully"
      }
      res.json(likeCoffeeResponse);
  } 



  @Patch(Endpoint.UNLIKE_COFFEE)
  @HttpCode(HttpStatus.OK)
  async unlikeCoffee(@Req() req: Request,@Res() res: Response, @Param("id") id: Id): Promise<any> { 
    const user: IUser = req["user"]
    await this.userService.unlikeCoffee(id, user);
    const unlikeCoffeeResponse: IUnlikeCoffee = { 
      success: true,
      mes: "unlike coffee successfully"
    }
    res.json(unlikeCoffeeResponse);
  }
}
