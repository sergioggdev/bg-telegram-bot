import { Context, Markup } from 'telegraf';
import { mockUsers } from '../types/user';

// Función de utilidad para procesar respuestas de búsqueda de usuarios
export const handleSearchUserReply = async (ctx: Context) => {
  try {
    if (!ctx.message || !('text' in ctx.message)) {
      return ctx.reply('Por favor, envía un mensaje de texto para buscar.');
    }

    const userText = ctx.message.text.trim();

    if (!userText) {
      return ctx.reply('Por favor, proporciona un término de búsqueda.');
    }

    const searchTerm = userText.toLowerCase();

    // Buscar usuarios que coincidan con el término de búsqueda
    const foundUsers = mockUsers.filter(
      user =>
        user.nombre.toLowerCase().includes(searchTerm) ||
        user.apellidos.toLowerCase().includes(searchTerm),
    );

    let resultText = `🔍 *RESULTADOS DE BÚSQUEDA: "${searchTerm}"*\n\n`;

    if (foundUsers.length === 0) {
      resultText += 'No se encontraron usuarios que coincidan con tu búsqueda.';
    } else {
      foundUsers.forEach(user => {
        resultText += `- *${user.nombre} ${user.apellidos}*\n`;
        resultText += `  • Estado: ${user.estado}`;

        if (user.estado === 'visitante' && user.visitas) {
          resultText += ` (${user.visitas} ${user.visitas === 1 ? 'visita' : 'visitas'})`;
        }

        resultText += `\n  • Inscripción: ${user.fechaInscripcion}\n\n`;
      });

      resultText += `Total encontrados: ${foundUsers.length} ${
        foundUsers.length === 1 ? 'usuario' : 'usuarios'
      }`;
    }

    return ctx.reply(resultText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Nueva búsqueda', 'search_user')],
        [Markup.button.callback('« Volver', 'users')],
      ]),
    });
  } catch (error) {
    return ctx.reply('Hubo un error al procesar tu búsqueda. Por favor, inténtalo de nuevo.');
  }
};
