import { EmojiFlavor } from '@grammyjs/emoji';
import { Context, SessionFlavor } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

export type MyContext = Context & SessionFlavor<SessionData> & EmojiFlavor<Context> & ConversationFlavor & {
  bot: {
    on: (event: string, callback: (ctx: any) => void) => void;
  };
}

interface GrammyError {
  method: string;
  payload: {
    callback_query_id: string;
    text: string;
  };
  ok: boolean;
  error_code: number;
  description: string;
  parameters: Record<string, unknown>;
}

export interface SessionData {}

export interface MyBotError extends Error {
  error: GrammyError;
  ctx: MyContext;
  name: 'BotError';
}


