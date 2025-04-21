import { Telegraf, Markup } from 'telegraf';

export const defineQuedadasAction = (bot: Telegraf) => {
  bot.action('quedadas', async ctx => {
    await ctx.answerCbQuery();
    return ctx.editMessageText(
      '¿Qué tipo de quedada te gustaría organizar?',
      Markup.inlineKeyboard([
        [Markup.button.callback('Ver resumen en Texto', 'events_text')],
        [Markup.button.callback('Ver quedadas disponibles', 'view_events')],
        [Markup.button.callback('Crear nueva quedada', 'create_event')],
      ]),
    );
  });
};
