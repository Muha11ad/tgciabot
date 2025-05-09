import { HttpModule } from '../http';
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { CommandsService } from './commands/command.service';
import { CallbacksService } from './callback/callback.service';
import { MiddlewareService } from './middleware/middleware.service';
import { StartCommand } from './commands/sub-commands/start.command';

@Module({
  imports: [HttpModule],
  providers: [
    BotService,

    StartCommand,
    CommandsService,

    CallbacksService,

    MiddlewareService,
  ],
})
export class BotModule { }
