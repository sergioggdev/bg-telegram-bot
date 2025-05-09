import { Telegraf, Markup } from 'telegraf';

export const defineStartCmd = (bot: Telegraf) => {
  bot.start(ctx => {
    if (ctx.payload.startsWith('fromGroup_quedadas_')) {
      return ctx.reply(
        '¿Qué tipo de quedada te gustaría organizar?',
        Markup.inlineKeyboard([
          [Markup.button.callback('Ver resumen en Texto', 'events_text')],
          [Markup.button.callback('Ver quedadas disponibles', 'view_events')],
          [Markup.button.callback('Crear nueva quedada', 'create_event')],
        ]),
      );
    }

    return ctx.reply(
      '¡Bienvenido! ¿Qué te gustaría hacer?',
      Markup.inlineKeyboard([
        [Markup.button.callback('Ver y crear quedadas', 'quedadas')],
        [Markup.button.callback('Ver usuarios', 'users')],
        [Markup.button.callback('Ver tu perfil', 'perfil')],
        [Markup.button.callback('Mostrar ayuda', 'help')],
      ]),
    );
  });
};
