import { HttpModule } from "./http";
import { Module } from "@nestjs/common";
import tgConfig from "@/configs/tg.config";
import { BotModule } from "./bot/bot.module";
import appConfig from "@/configs/app.config";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { configSchema } from "@/configs/config.schema";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                tgConfig,
                appConfig,
            ],
            validationSchema: configSchema
        }),
        BotModule,
        HttpModule,
        CacheModule.register({ isGlobal: true }),
    ],
})
export class AppModule { }