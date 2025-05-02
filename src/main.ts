import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import express from 'express';
import { Mongo } from './class/mongo';

import { defineCommandsList } from './config';
import { defineSearchInlineQuery } from './inline/search-inline';
import {
  defineStartCmd,
  defineHelpCmd,
  defineQuedadasCmd,
  defineUsersCmd,
  definePerfilCmd,
  defineGroupsCmd,
} from './comands';
import {
  defineQuedadasAction,
  defineEventTextAction,
  defineViewEventsAction,
  defineEventIdAction,
  defineJoinEventIdAction,
  defineCreateEventAction,
  defineShowUsersAction,
  defineUsersAction,
  defineSearchUsersAction,
  defineChangeRoleAction,
  defineCreateUserAction,
} from './actions';
import { defineTextMessageReplies } from './reply';

config();
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');
if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

(async () => {
  try {
    const app = express();
    const PORT = process.env.PORT || 3005;

    app.get('/', (req, res) => {
      res.status(200).send(`v${process.env.VERSION}`);
    });

    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
    });

    const bot = new Telegraf(process.env.BOT_TOKEN as string);
    await Mongo.getDb();

    // Config Definitions
    defineCommandsList(bot);

    // Command Definitions
    defineStartCmd(bot);
    defineHelpCmd(bot);
    defineQuedadasCmd(bot);
    defineUsersCmd(bot);
    definePerfilCmd(bot);
    defineGroupsCmd(bot);

    // Action Definitions
    defineQuedadasAction(bot);
    defineEventTextAction(bot);
    defineViewEventsAction(bot);
    defineEventIdAction(bot);
    defineJoinEventIdAction(bot);
    defineCreateEventAction(bot);
    defineShowUsersAction(bot);
    defineUsersAction(bot);
    defineSearchUsersAction(bot);
    defineChangeRoleAction(bot);
    defineCreateUserAction(bot);

    // Reply Definitions
    defineTextMessageReplies(bot);

    // SearchInline Definitions
    defineSearchInlineQuery(bot);

    bot.on('callback_query', async ctx => {
      const actionType = ctx.callbackQuery?.data;

      if (!actionType) {
        return ctx.answerCbQuery('Acción no reconocida.');
      }

      console.log(`Acción no reconocida detectada: ${actionType}`);
      await ctx.reply('Esta acción no está definida en el bot.');
    });

    // iniciar bot
    bot.launch();
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error('Error starting the bot:', error);
    process.exit(1);
  }
})();
