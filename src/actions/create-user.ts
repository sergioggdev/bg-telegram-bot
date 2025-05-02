import { adminOnly } from 'src/config';
import { Telegraf, Markup } from 'telegraf';

export const defineCreateUserAction = (bot: Telegraf) => {
  bot.action('create_user', adminOnly(), async ctx => {
    await ctx.answerCbQuery();
    return ctx.editMessageText(
      '👥 *CREAR USUARIO*\n\n' +
        'Para crear una usuario, responde a este mensaje con el siguiente formato:\n\n' +
        'Nombre del usuario\n' +
        'Apellidos del usuario\n' +
        'UserName del usuario\n\n' +
        '¡Esperando tu mensaje!',
      { parse_mode: 'Markdown' },
    );
  });
};
