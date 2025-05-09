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
            
            await ctx.reply('Hello!');

        } catch (error) {

            return handleBotError(error, COMMANDS.START, ctx);

        }
    }
}