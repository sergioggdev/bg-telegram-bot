import { Telegraf, Markup } from 'telegraf';

export const defineJoinEventIdAction = (bot: Telegraf) => {
  bot.action(/^join_(\d+)$/, async ctx => {
    await ctx.answerCbQuery();
    const eventId = ctx.match[1];
    const userId = ctx.from?.id;
    const username = ctx.from?.username || ctx.from?.first_name || 'Usuario';

    // Aquí añadirías lógica para registrar al usuario en el evento
    // await addUserToEvent(eventId, userId, username);

    return ctx.reply(`Te has apuntado al evento correctamente, ${username}!`);
  });
};
