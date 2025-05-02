import { Mongo } from 'src/class/mongo';
import { Context, Markup } from 'telegraf';
import { findUser } from 'src/config';
import { adminTypes } from 'src/types/user';
import e from 'express';

// Función de utilidad para procesar respuestas de búsqueda de usuarios
export const handleSearchUserReply = async (ctx: Context) => {
  try {
    const { username: userName, id: userID } = ctx.from || {};
    let searchTerm: string = (ctx.message as any).text.trim();
    if (searchTerm.startsWith('@')) searchTerm = searchTerm.slice(1);

    const db = await Mongo.getDb();
    const isAdmin = await findUser({ userID, userName, searchYypes: adminTypes });
    const user = await db.collection('users').findOne({ userName: searchTerm });

    if (!user) return ctx.reply('No se encontró ningún usuario con ese nombre de usuario.');

    const msg = `- ${user.name}${user.surname ? ` ${user.surname}` : ''} @${user.userName}${
      user.type === 'visitor' ? ` Nº Visitas: ${user.visits}` : ''
    }${!!isAdmin ? `\n*Tipo de usuario*: ${user.type}` : ''}
    `;

    if (user.type === 'owner') return ctx.reply(`🔍 *USUARIO ENCONTRADO*\n\n${msg}`, { parse_mode: 'Markdown' });

    if (isAdmin) {
      let enableActions: any[] = [];

      if (user.type === 'visitor')
        enableActions = [
          [Markup.button.callback('Ascender a Miembro', `change_role_member_${user.userName}`)],
          [Markup.button.callback('Deshabilitar Usuario', `change_role_disable_${user.userName}`)],
        ];

      if (user.type === 'member')
        enableActions = [
          [Markup.button.callback('Ascender a Administrador', `change_role_admin_${user.userName}`)],
          [Markup.button.callback('Deshabilitar Usuario', `change_role_disable_${user.userName}`)],
        ];

      if (user.type === 'admin')
        enableActions = [
          [Markup.button.callback('Quitar Administrador', `change_role_member_${user.userName}`)],
          [Markup.button.callback('Deshabilitar Usuario', `change_role_disable_${user.userName}`)],
        ];

      if (user.type === 'disable')
        enableActions = [[Markup.button.callback('Habilitar Usuario', `change_role_member_${user.userName}`)]];

      return ctx.reply(`🔍 *USUARIO ENCONTRADO*\n\n${msg}\n\n`, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([...enableActions]),
      });
    }

    return ctx.reply(`🔍 *USUARIO ENCONTRADO*\n\n${msg}`, { parse_mode: 'Markdown' });
  } catch (error) {
    return ctx.reply('Hubo un error al procesar tu búsqueda. Por favor, inténtalo de nuevo.');
  }
};
