import { Telegraf, Markup } from 'telegraf';

import { Mongo } from 'src/class/mongo';
import { findUser, membersRole } from 'src/config/auth';
import { visitorTypes, memberTypes, adminTypes, disabledTypes, allTypes } from 'src/types/user';

export const defineShowUsersAction = (bot: Telegraf) => {
  bot.action('show_users', membersRole(), async ctx => {
    await ctx.answerCbQuery();

    return ctx.editMessageText('👥 *FILTRAR USUARIOS POR TIPO*\n\n Selecciona el tipo de usuarios que quieres ver:', {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Junta Directiva', 'filter_by_admin')],
        [Markup.button.callback('Socios Activos', 'filter_by_member')],
        [Markup.button.callback('Usuarios de Baja', 'filter_by_disable')],
        [Markup.button.callback('Visitantes', 'filter_by_visitor')],
        [Markup.button.callback('« Volver', 'users')],
      ]),
    });
  });

  // Manejadores para cada tipo de filtro
  bot.action(/^filter_by_(.+)$/, membersRole(), async ctx => {
    await ctx.answerCbQuery();
    const filterType = ctx.match[1] as keyof typeof filterParams;
    const { username: userName, id: userID } = ctx.from || {};
    const isAdmin = await findUser({ userID, userName, searchYypes: adminTypes });

    // Validar que filterType sea un UserType válido
    if (!allTypes.includes(filterType as any)) {
      return ctx.editMessageText(
        'Tipo de filtro no válido.',
        Markup.inlineKeyboard([[Markup.button.callback('« Volver a filtros', 'show_users')]]),
      );
    }

    const filterParams = {
      admin: {
        filters: adminTypes.filter(type => type !== 'owner'),
        title: '📗 *JUNTA DIRECTIVA*',
      },
      member: { filters: memberTypes, title: '📗 *SOCIOS ACTIVOS*' },
      disable: { filters: disabledTypes, title: '📕 *USUARIOS DE BAJA*' },
      visitor: { filters: visitorTypes, title: '📘 *VISITANTES*' },
    };

    const db = await Mongo.getDb();
    const users = await db
      .collection('users')
      .find({ type: { $in: filterParams[filterType].filters } })
      .toArray();

    if (!users || users.length === 0)
      return ctx.editMessageText(
        'No hay usuarios con este estado.',
        Markup.inlineKeyboard([[Markup.button.callback('« Volver a filtros', 'show_users')]]),
      );

    const userMsg = users
      .map(
        user => `- ${user.name}${user.surname ? ` ${user.surname}` : ''} @${user.userName}${
          user.type === 'visitor' ? ` Nº Visitas: ${user.visits}` : ''
        }${!!isAdmin ? `\n*Tipo de usuario*: ${user.type}` : ''}
    `,
      )
      .join('\n');

    return ctx.editMessageText(`${filterParams[filterType].title}\n\n` + `${userMsg}`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.callback('« Volver a filtros', 'show_users')]]),
    });
  });
};
