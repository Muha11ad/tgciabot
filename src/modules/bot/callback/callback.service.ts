import { Bot } from 'grammy';
import { Injectable } from '@nestjs/common';
import { MyContext } from '@/shared/utils/types';

@Injectable()
export class CallbacksService {
  constructor(
  ) { }

  registerCallbacks(bot: Bot<MyContext>) {
  }
}
