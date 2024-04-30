import {MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as env from "dotenv";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddlewate, VerifyAdminMiddlewate } from "./common/middlewares/auth.middlewate";
import { JwtHelper } from "./common/helpers/jwt.helpers";
import { JwtService } from "@nestjs/jwt";
import { CoffeeItemModule } from "./coffeeItem/coffee-item.module";
import { OrderModule } from "./order/order.module";
import { Endpoint } from "./common/constants/endpoint.constant";
import { ReviewModule } from "./review/review.module";
import { WalletModule } from "./wallet/wallet.module";
env.config();
@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
      connectionFactory: (connection: any) => {
        connection.on('connected', () => {
          console.log('is connected');
        });
        connection.on('disconnected', () => {
          console.log('DB disconnected');
        });
        connection.on('error', (error: any) => {
          console.log('DB connection failed! for error: ', error);
        });
        connection._events.connected();
        return connection;
      },
    }),
    UserModule,
    CategoryModule,
    CoffeeItemModule,
    OrderModule,
    ReviewModule,
    WalletModule
  ],
  providers: [JwtHelper, JwtService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlewate, VerifyAdminMiddlewate)
      .forRoutes(
        `/user/${Endpoint.ALL_USER}`
      )
    consumer.apply(AuthMiddlewate)
      .forRoutes(
      `user/${Endpoint.FIND_USER_LOGIN}`,
      `user/${Endpoint.LIKE_COFFEE}`,
      `user/${Endpoint.UNLIKE_COFFEE}`,
      `user/${Endpoint.GET_COFFEE_LIKED}`,
      `order/${Endpoint.ORDER_COFFEE}`,
      `order/${Endpoint.GET_ALL_ORDER_USER_LOGIN}`,
      `order/${Endpoint.CANCLE_ORDER}`,
      `review/${Endpoint.REVIEW_COFFEE}`,
      `wallet/${Endpoint.CREATE_WALLET}`,
      `wallet/${Endpoint.TOP_UP_TO_WALLET}`,
      `coffee-item/${Endpoint.GET_ALL_COFFEE}`
      )
  }
}
