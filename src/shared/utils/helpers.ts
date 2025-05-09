import { SERVER_ERROR } from "./consts";
import { MyContext } from "./types";
import { CustomLogger } from "@/shared/logger/custom.logger";

export async function deletePrevMessage(ctx: MyContext) {

  try {
  
    if (ctx?.message && ctx?.message?.chat && ctx?.message?.chat?.id) {
  
      await ctx.api.deleteMessage(ctx?.message?.chat?.id, ctx?.message?.message_id);
  
    } else if (
  
      ctx.callbackQuery &&
      ctx.callbackQuery?.message &&
      ctx.callbackQuery?.message?.chat &&
      ctx.callbackQuery?.message?.chat?.id
  
    ) {
  
      await ctx.api.deleteMessage(
        ctx?.callbackQuery?.message?.chat.id,
        ctx?.callbackQuery?.message?.message_id,
  
      );
    } else {
  
      throw new Error('Message or chat or id not found');
  
    }
  } catch (error) {
  
    console.error('Failed to delete previous message:', error);
 
  }
}

export function handleApiError(error: any, endpoint: string, method: string) {

  const logger = new CustomLogger('Helpers');

  logger.error(`Failed to call ${method} ${endpoint}:`, error.response.data.error);

  return error.response.data;

}

export async function handleBotError(error: any, command: string, ctx: MyContext,) {

  console.log(`Failed to execute command ${command}:`, error);

  if (ctx?.callbackQuery) {

    await ctx.answerCallbackQuery({ text: SERVER_ERROR });

  } else {

    await ctx.reply(SERVER_ERROR);

  }
}

export function formatMessage(message: string): string {
  return message.replaceAll(',', "\n");
}