import { visitorRole } from 'src/config';
import { Telegraf, Markup } from 'telegraf';

export const defineQuedadasCmd = (bot: Telegraf) => {
  bot.command('quedadas', visitorRole(false), ctx => {
    const chatType = ctx.chat?.type || '';
    const isGroup = chatType.includes('group');

    if (isGroup) {
      const botUsername = bot.botInfo?.username;
      if (!botUsername) return ctx.reply('No se pudo obtener el nombre de usuario del bot');
      const userId = ctx.from?.id;
      if (!userId) return ctx.reply('No se pudo obtener el ID del usuario');
      const startPayload = `fromGroup_quedadas_${userId}`;

      return ctx.reply(
        'Abrir conversacion con el bot para apuntarte a alguna quedada',
        Markup.inlineKeyboard([[Markup.button.url('Apuntarse!', `https://t.me/${botUsername}?start=${startPayload}`)]]),
      );
    }

    return ctx.reply(
      '¿Qué tipo de quedada te gustaría organizar?',
      Markup.inlineKeyboard([
        [Markup.button.callback('Ver resumen en Texto', 'events_text')],
        [Markup.button.callback('Ver quedadas disponibles', 'view_events')],
        [Markup.button.callback('Crear nueva quedada', 'create_event')],
      ]),
    );
  });
};
