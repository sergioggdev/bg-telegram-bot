import { Context } from 'telegraf';

// Función de utilidad para procesar respuestas de creación de eventos
export const handleCreateEventReply = async (ctx: Context) => {
  try {
    if (!ctx.message || !('text' in ctx.message)) {
      return ctx.reply('Por favor, envía un mensaje de texto para crear el evento.');
    }

    const userText = ctx.message.text;
    const lines = userText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 4) {
      return ctx.reply(
        'Por favor, proporciona toda la información necesaria siguiendo el formato.',
      );
    }

    const eventName = lines[0];
    const eventDate = lines[1];
    const eventDescription = lines[2];
    const eventPlayers = lines[3].split(',').map(p => p.trim());
    const maxPlayers = parseInt(lines[4]) || eventPlayers.length + 2;

    return ctx.reply(
      `¡Evento creado con éxito!\n\n` +
        `📅 *${eventName}* (${eventDate})\n` +
        `📝 ${eventDescription}\n` +
        `👥 Jugadores: ${eventPlayers.join(', ')}\n` +
        `🔢 Máximo: ${maxPlayers} jugadores`,
      { parse_mode: 'Markdown' },
    );
  } catch (error) {
    return ctx.reply('Hubo un error al procesar tu solicitud. Por favor, revisa el formato.');
  }
};
