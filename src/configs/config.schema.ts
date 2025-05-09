import * as Joi from "joi";

export const configSchema = Joi.object({
    
    APP_MODE: Joi.string().valid('dev', 'prod', 'test'),
    APP_PORT: Joi.number(),

    ADMIN_TELEGRAM_ID: Joi.number(),

    TELEGRAM_BOT_TOKEN: Joi.string(),


}).options({ presence: "required" });