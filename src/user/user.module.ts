import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchemma } from "./schema/user.schema";
import { JwtHelper } from "src/common/helpers/jwt.helpers";
import { JwtModule } from "@nestjs/jwt";
import { JwtContant } from "src/common/constants/jwt.constant";
import { CoffeeItemModule } from "src/coffeeItem/coffee-item.module";
@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name, schema: UserSchemma
  }]),
  JwtModule.register({
    global: false,
    secret: JwtContant.SECRET_ACCESSTOKEN,
    signOptions: {
      expiresIn: "100s"
    }
  }),
  CoffeeItemModule
],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtHelper],
  exports: [UserRepository]
})
export class UserModule {}
