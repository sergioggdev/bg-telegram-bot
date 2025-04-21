import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

import { defineCommandsList, groupOnly } from './config';
import { defineSearchInlineQuery } from './inline/search-inline';
import {
  defineStartCmd,
  defineHelpCmd,
  defineQuedadasCmd,
  defineUsersCmd,
  definePerfilCmd,
} from './comands';
import {
  defineQuedadasAction,
  defineEventTextAction,
  defineViewEventsAction,
  defineEventIdAction,
  defineJoinEventIdAction,
  defineCreateEventAction,
  defineFilterUsersAction,
  defineShowUsersAction,
  defineUsersAction,
  defineSearchUsersAction,
} from './actions';
import { defineTextMessageReplies } from './reply';

config();
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

try {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  // Config Definitions
  defineCommandsList(bot);

  // Command Definitions
  defineStartCmd(bot);
  defineHelpCmd(bot);
  defineQuedadasCmd(bot);
  defineUsersCmd(bot);
  definePerfilCmd(bot);

  // Action Definitions
  defineQuedadasAction(bot);
  defineEventTextAction(bot);
  defineViewEventsAction(bot);
  defineEventIdAction(bot);
  defineJoinEventIdAction(bot);
  defineCreateEventAction(bot);
  defineFilterUsersAction(bot);
  defineShowUsersAction(bot);
  defineUsersAction(bot);
  defineSearchUsersAction(bot);

  // Reply Definitions
  defineTextMessageReplies(bot);

  // SearchInline Definitions
  defineSearchInlineQuery(bot);

  bot.launch();
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
} catch (error) {
  console.error('Error starting the bot:', error);
  process.exit(1);
}
