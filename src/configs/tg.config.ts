import { registerAs } from "@nestjs/config";

export default registerAs("tg", () => ({
    adminId: process.env.ADMIN_TELEGRAM_ID,
    botToken: process.env.TELEGRAM_BOT_TOKEN
}))

export const TG_CONFIG = {
    adminId: 'tg.adminId',
    botToken: 'tg.botToken',
}