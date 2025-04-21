import { Telegraf } from 'telegraf';

export const defineSearchInlineQuery = (bot: Telegraf) => {
  // bot.on('inline_query', async ctx => {
  //   const query = ctx.inlineQuery?.query || '';
  //   const queryParts = query.split(' ');
  //   const command = queryParts[0].toLowerCase();
  //   const argument = queryParts.slice(1).join(' ');
  //   const result = [];
  //   return await ctx.answerInlineQuery(results);
  // });
};
