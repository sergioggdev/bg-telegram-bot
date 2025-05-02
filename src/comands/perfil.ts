import { Telegraf, Markup } from 'telegraf';
import { visitorRole } from 'src/config';
import { Mongo } from 'src/class/mongo';

export const definePerfilCmd = (bot: Telegraf) => {
  bot.command('perfil', visitorRole(), async ctx => {
    const { id: userID } = ctx.from || {};

    const db = await Mongo.getDb();
    const user = await db.collection('users').findOne({ userID: userID });
    if (!user) return ctx.reply('No se encontró el usuario en la base de datos.');

    const perfilText =
      '📋 *PERFIL DE USUARIO*\n\n' +
      `👤 Nombre: ${user.name} ${user.surname}\n` +
      `👤 UserName: ${user.userName}\n` +
      `🔰 Rol: ${user.type}\n` +
      `${user.type === 'visitor' ? `Numero de visitas: ${user.visits}` : ''}`;

    return ctx.reply(perfilText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        // [Markup.button.callback('Editar perfil', 'edit_profile')],
      ]),
    });
  });
};
