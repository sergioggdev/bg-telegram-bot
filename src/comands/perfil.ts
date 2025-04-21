import { Telegraf, Markup } from 'telegraf';
import { mockUsers } from '../types/user';

export const definePerfilCmd = (bot: Telegraf) => {
  bot.command('perfil', async ctx => {
    // Obtener un usuario aleatorio de mockUsers
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    const usuario = mockUsers[randomIndex];

    // Crear mensaje con la información del perfil
    const perfilText = `
📋 *PERFIL DE USUARIO*

👤 *Nombre:* ${usuario.nombre} ${usuario.apellidos}
🔰 *Estado:* ${usuario.estado}${
      usuario.estado === 'visitante' && usuario.visitas
        ? ` (${usuario.visitas} ${usuario.visitas === 1 ? 'visita' : 'visitas'})`
        : ''
    }
📆 *Fecha de inscripción:* ${usuario.fechaInscripcion}
`;

    // Enviar mensaje con botones para más opciones
    return ctx.reply(perfilText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        // [Markup.button.callback('Editar perfil', 'edit_profile')],
        // [Markup.button.callback('« Menú principal', 'start')],
      ]),
    });
  });
};
