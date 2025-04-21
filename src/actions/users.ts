import { Telegraf, Markup } from 'telegraf';

export const defineUsersAction = (bot: Telegraf) => {
  bot.action('users', async ctx => {
    await ctx.answerCbQuery();

    return ctx.editMessageText(
      '👥 *GESTIÓN DE USUARIOS DE LA ASOCIACIÓN*\n\n' +
        'Selecciona una opción para gestionar los usuarios:',
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
