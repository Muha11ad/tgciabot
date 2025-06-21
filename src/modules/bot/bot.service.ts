import { Bot, session } from 'grammy';
import { ConfigService } from '@nestjs/config';
import { TG_CONFIG } from '@/configs/tg.config';
import { CustomLogger } from '@/shared/logger/custom.logger';
import { MyBotError, MyContext, SessionData } from '@/shared/utils/types';
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { CommandsService } from './commands/command.service';
import { CallbacksService } from './callback/callback.service';
import { MiddlewareService } from './middleware/middleware.service';
import { SERVER_ERROR } from '@/shared/utils/consts';
import { justFunction } from '@/function';


@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Bot<MyContext>;
  private logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandsService: CommandsService,
    private readonly callbacksService: CallbacksService,
    private readonly middlewareService: MiddlewareService
  ) {

    const token = this.configService.get(TG_CONFIG.botToken);
    this.bot = new Bot<MyContext>(token);
    this.logger = new CustomLogger(BotService.name);

  }

  async onModuleInit() {

    try {

      this.bot.use(session({

        initial: (): SessionData => ({}),

      }),

      );

      this.commandsService.registerCommands(this.bot);

      this.bot.on('message', justFunction);

      this.middlewareService.registerMiddleware(this.bot);

      this.callbacksService.registerCallbacks(this.bot);

      this.bot.catch((err: MyBotError) => {

        const ctx = err.ctx;

        if (err.error.error_code === 403) {

          this.logger.error('Bot was blocked by user:', ctx.from.id.toString());
          return;

        }

        ctx.reply(SERVER_ERROR);

      });

      await this.bot.start();

    } catch (error) {

      this.logger.error('Error:', error);

    }

  }

  async onModuleDestroy() {

    this.bot.stop();
    console.log('Bot stopped');

  }
}
