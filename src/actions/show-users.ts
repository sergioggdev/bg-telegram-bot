import { Telegraf, Markup } from 'telegraf';
import { User, mockUsers } from '../types/user';

export const defineShowUsersAction = (bot: Telegraf) => {
  bot.action('show_all_users', async ctx => {
    await ctx.answerCbQuery();

    // Generar texto con la lista de usuarios
    let usersList = '👥 *LISTADO DE USUARIOS DE LA ASOCIACIÓN*\n\n';

    // Agrupar usuarios por estado
    const habilitados = mockUsers.filter(user => user.estado === 'habilitado');
    const deshabilitados = mockUsers.filter(user => user.estado === 'deshabilitado');
    const visitantes = mockUsers.filter(user => user.estado === 'visitante');

    // Mostrar usuarios habilitados
    usersList += '*📗 SOCIOS HABILITADOS:*\n';
    habilitados.forEach(user => {
      usersList += `- ${user.nombre} ${user.apellidos} _(desde ${user.fechaInscripcion})_\n`;
    });

    // Mostrar usuarios deshabilitados
    usersList += '\n*📕 SOCIOS DESHABILITADOS:*\n';
    deshabilitados.forEach(user => {
      usersList += `- ${user.nombre} ${user.apellidos} _(desde ${user.fechaInscripcion})_\n`;
    });

    // Mostrar usuarios visitantes
    usersList += '\n*📘 VISITANTES:*\n';
    visitantes.forEach(user => {
      usersList += `- ${user.nombre} ${user.apellidos} - ${user.visitas} ${
        user.visitas === 1 ? 'visita' : 'visitas'
      } _(desde ${user.fechaInscripcion})_\n`;
    });

    // Añadir estadísticas
    usersList += '\n*📊 RESUMEN:*\n';
    usersList += `- Total usuarios: ${mockUsers.length}\n`;
    usersList += `- Socios habilitados: ${habilitados.length}\n`;
    usersList += `- Socios deshabilitados: ${deshabilitados.length}\n`;
    usersList += `- Visitantes: ${visitantes.length}\n`;

    return ctx.editMessageText(usersList, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Buscar usuario', 'search_user')],
        [Markup.button.callback('« Volver', 'users')],
      ]),
    });
  });
};
