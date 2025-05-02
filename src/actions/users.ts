import { membersRole } from 'src/config';
import { Telegraf, Markup } from 'telegraf';

export const defineUsersAction = (bot: Telegraf) => {
  bot.action('users', membersRole(), async ctx => {
    await ctx.answerCbQuery();

    return ctx.editMessageText('👥 *GESTIÓN DE USUARIOS*\n\n' + 'Selecciona una opción:', {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Listado de socios', 'show_users')],
        [Markup.button.callback('Buscar usuario', 'search_user')],
        [Markup.button.callback('Crear usuario', 'create_user')],
      ]),
    });
  });
};
