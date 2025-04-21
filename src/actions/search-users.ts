import { Telegraf, Markup } from 'telegraf';
import { mockUsers } from '../types/user';

export const defineSearchUsersAction = (bot: Telegraf) => {
  // Acción para buscar usuarios
  bot.action('search_user', async ctx => {
    await ctx.answerCbQuery();

    // Guardamos el estado del usuario para saber que está esperando una respuesta de búsqueda
    const userId = ctx.from?.id;
    if (userId) {
      // En una implementación real, esto se guardaría en una base de datos o un mapa en memoria
      // userStates.set(userId, 'waiting_search_query');
    }

    return ctx.editMessageText(
      '🔍 *BÚSQUEDA DE USUARIOS*\n\n' +
        'Para buscar un usuario, responde a este mensaje con el nombre o apellido que quieres buscar.\n\n' +
        'Por ejemplo: "Carlos" o "Rodríguez"',
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([[Markup.button.callback('« Volver', 'users')]]),
      },
    );
  });
};
