import { Telegraf, Markup } from 'telegraf';

export const defineViewEventsAction = (bot: Telegraf) => {
  bot.action('view_events', async ctx => {
    await ctx.answerCbQuery();
    return ctx.editMessageText(
      'Ahora mismo hay disponibles las siguientes quedadas:',
      Markup.inlineKeyboard([
        [Markup.button.callback('Jueves 26 - El Dorado, (lleno)', 'event_12345')],
        [Markup.button.callback('Viernes 27 - Root (1 hueco)', 'event_23456')],
        [Markup.button.callback('Viernes 27 - Apothebakery (2 huecos)', 'event_34567')],
        [Markup.button.callback('Domingo 29 - DnD (3 huecos)', 'event_45678')],
        [Markup.button.callback('« Volver', 'quedadas')],
      ]),
    );
  });
};
