import { Bot } from 'grammy';
import { Injectable } from '@nestjs/common';
import { COMMANDS } from '@/shared/utils/consts';
import { MyContext } from '@/shared/utils/types';
import { StartCommand } from './sub-commands/start.command';

@Injectable()
export class CommandsService {

  constructor(
    private readonly startCommand: StartCommand,
  ) { }

  registerCommands(bot: Bot<MyContext>) {

    bot.command(COMMANDS.START, async (ctx) => this.startCommand.execute(ctx));

  }

}
