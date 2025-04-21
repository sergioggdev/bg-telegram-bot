import { Telegraf } from 'telegraf';
import { handleCreateEventReply } from './create-event';
import { handleSearchUserReply } from './search-users';
import { message } from 'telegraf/filters';

export const defineTextMessageReplies = (bot: Telegraf) => {
  // Un único listener para todos los mensajes de texto
  bot.on(message('text'), async ctx => {
    const replyToMessage = ctx.message.reply_to_message;
    if (!replyToMessage) return;

    const isBotMessage = replyToMessage.from?.id === ctx.botInfo.id;
    if (!isBotMessage) return;

    if (!('text' in replyToMessage)) return;

    // Determinar qué tipo de respuesta es y procesarla adecuadamente
    if (replyToMessage.text?.includes('Para crear una quedada, responde a este mensaje')) {
      await handleCreateEventReply(ctx);
    } else if (replyToMessage.text?.includes('Para buscar un usuario, responde a este mensaje')) {
      await handleSearchUserReply(ctx);
    }
    // Se pueden añadir más condiciones para otros tipos de respuestas en el futuro
  });
};
