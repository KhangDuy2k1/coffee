import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchemma } from "./schema/user.schema";
import * as bcrypt from "bcrypt";
import { PasswordConstant } from "src/common/constants/password-hasher.constant";
import { JwtHelper } from "src/common/helpers/jwt.helpers";
import { JwtModule } from "@nestjs/jwt";
import { JwtContant } from "src/common/constants/jwt.constant";
import { CoffeeItemModule } from "src/coffeeItem/coffee-item.module";
@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name, 
    useFactory: () => {
      const schema = UserSchemma;
      const round = PasswordConstant.BCRYPT_ROUND;
      schema.pre('save', async function () {
         const hashPassword = await bcrypt.hash(this.password, round)
         this.password = hashPassword
      });
      return schema;
    }, 
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
