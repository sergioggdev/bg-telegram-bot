import { Telegraf, Markup } from 'telegraf';
import { membersRole } from 'src/config/auth';

export const defineUsersCmd = (bot: Telegraf) => {
  bot.command('users', membersRole(), ctx => {
    // const { username: userName, id: userID } = ctx.from || {};
    // const isAdmin = await findUser({ userID, userName, searchYypes: adminTypes });

    return ctx.reply('👥 *GESTIÓN DE USUARIOS*\n\n' + 'Selecciona una opción:', {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Listado de socios', 'show_users')],
        [Markup.button.callback('Buscar usuario', 'search_user')],
        [Markup.button.callback('Crear usuario', 'create_user')],
      ]),
    });
  });
};
