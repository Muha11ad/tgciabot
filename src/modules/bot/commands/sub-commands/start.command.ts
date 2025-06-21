import { Injectable } from "@nestjs/common";
import { ICommand } from "../command.interface";
import { MyContext } from "@/shared/utils/types";
import { COMMANDS } from "@/shared/utils/consts";
import { handleBotError } from "@/shared/utils/helpers";

@Injectable()
export class StartCommand implements ICommand {

    constructor(
    ) { }

    public async execute(ctx: MyContext): Promise<void> {

        try {
            const message = `
            Скидывай свои идеи в любом формате — текст, голосовое, фото, видео 📩 \n Главное — убедись, что у тебя есть никнейм (@username), чтобы мы могли связаться )
            `
            await ctx.reply(message);

        } catch (error) {

            return handleBotError(error, COMMANDS.START, ctx);

        }
    }
}