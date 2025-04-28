import { Telegraf } from 'telegraf';
import { InlineQueryResult } from 'telegraf/types';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

import {
  emptyDefaultArticle,
  emptyGamesArticle,
  errorGamesArticle,
  gamesArticle,
} from './default-msg';

const API_URL = 'https://boardgamegeek.com/xmlapi/';

export const defineSearchInlineQuery = (bot: Telegraf) => {
  bot.on('inline_query', async ctx => {
    const query = ctx.inlineQuery?.query || '';

    if (!query) return await ctx.answerInlineQuery([emptyDefaultArticle], { cache_time: 60 });

    try {
      const idResponse = await axios.get(
        `${API_URL}search?search=${encodeURIComponent(query)}&exact=1`,
      );
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
      const idData = parser.parse(idResponse.data);

      // Extraer los resultados de juegos
      const idBoardgamesXML = idData?.boardgames?.boardgame || [];
      const idBoardgames = Array.isArray(idBoardgamesXML) ? idBoardgamesXML : [idBoardgamesXML];
      if (!idBoardgames.length)
        return await ctx.answerInlineQuery([emptyGamesArticle], { cache_time: 60 });

      // La API de la BBG solo permite pedir imagenes de max 20 juegos a la vez
      const idGames = idBoardgames.slice(0, 10);

      // TODO llamar a la API para sacar mas info del juego
      const gamesID = idGames.map((game: any) => game.objectid).join(',');
      const response = await axios.get(`${API_URL}boardgame/${gamesID}`);
      const data = parser.parse(response.data);
      const BoardgamesXML = data?.boardgames?.boardgame || [];
      const games = Array.isArray(BoardgamesXML) ? BoardgamesXML : [BoardgamesXML];

      const results: InlineQueryResult[] = games.map(gamesArticle(idGames));

      // Devolver los resultados
      return await ctx.answerInlineQuery(results, { cache_time: 60 });
    } catch (error) {
      console.error('Error searching BGG:', error);
      return await ctx.answerInlineQuery([errorGamesArticle], { cache_time: 30 });
    }
  });
};
