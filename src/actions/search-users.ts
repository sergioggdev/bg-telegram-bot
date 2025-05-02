import { Telegraf, Markup } from 'telegraf';

import { membersRole } from 'src/config';

export const defineSearchUsersAction = (bot: Telegraf) => {
  bot.action('search_user', membersRole(), async ctx => {
    return ctx.editMessageText(
      '🔍 *BÚSQUEDA DE USUARIOS*\n\n' +
        'Para buscar un usuario, responde a este mensaje con el userName de teelgram del usuario a buscar.\n\n' +
        'Por ejemplo: "@rabbit89" o "@juan345"',
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([[Markup.button.callback('« Volver', 'users')]]),
      },
    );
  });
};
