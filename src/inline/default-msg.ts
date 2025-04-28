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

export const gamesArticle =
  (gamesSearch: any) =>
  (game: any): InlineQueryResult => {
    const searchName = gamesSearch.find((search: any) => search.objectid === game.objectid);

    console.log('Search:', searchName);
    const gameName = decodeHtmlEntities(
      searchName?.name['#text'] || searchName?.name || 'Juego desconocido',
    );
    const descripción = decodeHtmlEntities(game.description || 'Descripción no disponible');
    const yearpublished = game.yearpublished ? `📅 Año: ${game.yearpublished}\n` : '';

    const messageText =
      `🎲 *${gameName}*\n` +
      `👥 Minimo de jugadores: ${game.minplayers}\n` +
      `👥 Máximo de jugadores: ${game.maxplayers}\n` +
      `⏱️ Tiempo de juego: ${game.playingtime} minutos\n` +
      yearpublished +
      `🔗 [Ver en BGG](https://boardgamegeek.com/boardgame/${game.objectid})\n`;

    return {
      hide_url: false,
      type: 'article',
      id: game.objectid,
      title: gameName,
      description: descripción,
      thumbnail_url: game.thumbnail,
      url: `https://boardgamegeek.com/boardgame/${game.objectid}`,
      input_message_content: { message_text: messageText, parse_mode: 'Markdown' },
      reply_markup: {
        inline_keyboard: [[{ text: 'Crear quedada', callback_data: 'create_event' }]],
      },
    };
  };

const decodeHtmlEntities = (text: string): string => {
  return text
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};
