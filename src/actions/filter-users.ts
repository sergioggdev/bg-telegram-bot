import { Telegraf, Markup } from 'telegraf';
import { mockUsers } from '../types/user';

export const defineFilterUsersAction = (bot: Telegraf) => {
  // Acción para mostrar opciones de filtrado
  bot.action('filter_users', async ctx => {
    await ctx.answerCbQuery();

    return ctx.editMessageText(
      '👥 *FILTRAR USUARIOS POR ESTADO*\n\n' + 'Selecciona el tipo de usuarios que quieres ver:',
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Socios habilitados', 'filter_by_habilitado')],
          [Markup.button.callback('Socios deshabilitados', 'filter_by_deshabilitado')],
          [Markup.button.callback('Visitantes', 'filter_by_visitante')],
          [Markup.button.callback('« Volver', 'users')],
        ]),
      },
    );
  });

  // Manejadores para cada tipo de filtro
  bot.action(/^filter_by_(.+)$/, async ctx => {
    await ctx.answerCbQuery();

    const filterType = ctx.match[1];
    let titulo = '';
    let filteredUsers = [];

    switch (filterType) {
      case 'habilitado':
        titulo = '📗 *SOCIOS HABILITADOS*';
        filteredUsers = mockUsers.filter(user => user.estado === 'habilitado');
        break;
      case 'deshabilitado':
        titulo = '📕 *SOCIOS DESHABILITADOS*';
        filteredUsers = mockUsers.filter(user => user.estado === 'deshabilitado');
        break;
      case 'visitante':
        titulo = '📘 *VISITANTES*';
        filteredUsers = mockUsers.filter(user => user.estado === 'visitante');
        break;
      default:
        titulo = '👥 *TODOS LOS USUARIOS*';
        filteredUsers = mockUsers;
    }

    // Formateamos el texto de la respuesta
    let resultText = `${titulo}\n\n`;

    if (filteredUsers.length === 0) {
      resultText += 'No hay usuarios con este estado.';
    } else {
      filteredUsers.forEach(user => {
        resultText += `- ${user.nombre} ${user.apellidos}`;

        if (user.estado === 'visitante' && user.visitas) {
          resultText += ` - ${user.visitas} ${user.visitas === 1 ? 'visita' : 'visitas'}`;
        }

        resultText += ` _(desde ${user.fechaInscripcion})_\n`;
      });

      resultText += `\nTotal: ${filteredUsers.length} ${
        filteredUsers.length === 1 ? 'usuario' : 'usuarios'
      }`;
    }

    return ctx.editMessageText(resultText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.callback('« Volver a filtros', 'filter_users')]]),
    });
  });
};
