import { Telegraf, Markup } from 'telegraf';

export const defineUsersCmd = (bot: Telegraf) => {
  bot.command('users', ctx => {
    const chatType = ctx.chat?.type || '';
    const isPrivate = chatType === 'private';

    // Verificar si el comando se está usando en un chat privado
    if (!isPrivate) {
      return ctx.reply(
        'Este comando solo puede ser utilizado en un chat privado con el bot. ' +
          'Por favor, envía el comando directamente al bot en un chat privado.',
      );
    }

    return ctx.reply(
      `👥 *GESTIÓN DE USUARIOS DE LA ASOCIACIÓN*
    Selecciona una opción para gestionar los usuarios:`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Ver todos los usuarios', 'show_all_users')],
          [Markup.button.callback('Buscar usuario', 'search_user')],
          [Markup.button.callback('Filtrar por estado', 'filter_users')],
        ]),
      },
    );
  });
};
