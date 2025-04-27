import { InlineQueryResult } from 'telegraf/types';

export const emptyDefaultArticle: InlineQueryResult = {
  type: 'article',
  id: 'xxxxx-xxxxx-xxxxx-xxxxx',
  title: 'Nombre del juego...',
  description: 'Descipccion del juego...',
  thumbnail_url: 'https://www.enclavedejuego.com/wp-content/uploads/2023/01/logotipo-enclave.png',
  input_message_content: {
    message_text: 'Tienes que escribir algo para buscar un juego.',
  },
};

export const emptyGamesArticle: InlineQueryResult = {
  type: 'article',
  id: 'xxxxx-xxxxx-xxxxx-xxxxx',
  title: 'No se han encontrado resultados',
  input_message_content: {
    message_text: 'No se han encontrado resultados',
  },
};

export const errorGamesArticle: InlineQueryResult = {
  type: 'article',
  id: 'xxxxx-xxxxx-xxxxx-xxxxx',
  title: 'Error en la búsqueda',
  input_message_content: {
    message_text: 'Lo siento, hubo un error al buscar juegos. \n Intenta más tarde.',
    parse_mode: 'Markdown',
  },
};

export const gamesArticle = (game: any): InlineQueryResult => {
  const gameName = Array.isArray(game.name)
    ? game.name.find((name: any) => name.primary === 'true')['#text']
    : game.name['#text'];

  // Crear el texto del mensaje
  const messageText =
    `🎲 *${gameName}*\n` +
    `${game.yearpublished ? `📅 Año: ${game.yearpublished}\n` : ''}` +
    `🔗 [Ver en BGG](https://boardgamegeek.com/boardgame/${game.objectid})`;

  return {
    hide_url: false,
    type: 'article',
    id: game.objectid,
    title: gameName || 'Juego desconocido',
    description: game.description || 'Descripción no disponible',
    thumbnail_url: game.thumbnail,
    url: `https://boardgamegeek.com/boardgame/${game.objectid}`,
    input_message_content: { message_text: messageText, parse_mode: 'Markdown' },
    reply_markup: {
      inline_keyboard: [[{ text: 'Crear quedada', callback_data: 'create_event' }]],
    },
  };
};
