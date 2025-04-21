import { Context } from 'telegraf';

export const groupOnly = (ctx: Context, next: () => void) => {
  const chatId = ctx.chat?.id;
  const authGroups = process.env.AUTHORIZED_GROUPS?.split(',') || [];
  if (!!chatId && authGroups.includes(String(chatId))) return next();
  return ctx.reply('Este comando solo puede ser usado en el grupo autorizado.');
};
