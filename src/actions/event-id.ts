import { Telegraf, Markup } from 'telegraf';

export const defineEventIdAction = (bot: Telegraf) => {
  bot.action(/^event_(\d+)$/, async ctx => {
    await ctx.answerCbQuery();
    const eventId = ctx.match[1];
    let eventDetails;
    switch (eventId) {
      case '12345':
        eventDetails = {
          name: 'El Dorado',
          date: 'Jueves 26',
          players: ['Juan', 'Sara', 'Pedro', 'Laura'],
          maxPlayers: 4,
          description: 'Juego de estrategia sobre la búsqueda de tesoros en El Dorado.',
        };
        break;
      case '23456':
        eventDetails = {
          name: 'Root',
          date: 'Viernes 27',
          players: ['Carlos', 'Ana', 'Luis'],
          maxPlayers: 4,
          description: 'Un juego de guerra, conquista y control territorial con animales.',
        };
        break;
      case '34567':
        eventDetails = {
          name: 'Apothebakery',
          date: 'Viernes 27',
          players: ['Sergio', 'Laura'],
          maxPlayers: 4,
          description: 'Juego de mesa donde los jugadores son alquimistas que crean pociones.',
        };
        break;
      case '45678':
        eventDetails = {
          name: 'DnD',
          date: 'Domingo 29',
          players: ['Vic', 'Aroa', 'Pepelu', 'Juan', 'Fede', 'Guillermo'],
          maxPlayers: 6,
          description: 'Juego de rol donde los jugadores crean personajes y viven aventuras.',
        };
        break;

      default:
        eventDetails = {
          name: 'Evento desconocido',
          date: 'Fecha no disponible',
          players: [],
          maxPlayers: 0,
          description: 'No se encontró información sobre este evento.',
        };
    }
    const playersList = eventDetails.players.join(', ');
    const freeSpots = eventDetails.maxPlayers - eventDetails.players.length;
    const isFull = eventDetails.players.length >= eventDetails.maxPlayers;

    return ctx.editMessageText(
      `📅 *${eventDetails.name}* (${eventDetails.date})\n\n` +
        `📝 ${eventDetails.description}\n\n` +
        `👥 *Jugadores (${eventDetails.players.length}/${eventDetails.maxPlayers})*:\n` +
        `${playersList}\n\n` +
        `${
          freeSpots > 0 ? `¡Hay ${freeSpots} hueco(s) disponible(s)!` : 'Este evento está completo.'
        }\n`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          !isFull ? [Markup.button.callback('Apuntarme', `join_${eventId}`)] : [],
          [Markup.button.callback('« Volver a la lista', 'view_events')],
        ]),
      },
    );
  });
};
