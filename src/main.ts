import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common"
async function main() { 
  const port = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "log"],
  });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe(
    { forbidNonWhitelisted: true, whitelist: true }
  ));
  await app.listen(port);
}
main();
