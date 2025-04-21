import { Telegraf } from 'telegraf';

export const defineEventTextAction = (bot: Telegraf) => {
  bot.action('events_text', async ctx => {
    await ctx.answerCbQuery();
    return ctx.editMessageText(`
Aquí tienes un resumen de las quedadas disponibles:

JUEVES 26
16:00 El Dorado => Salva ,Jaime , Teko(invitado), Toni(invitado) | 4/4

Viernes 27
17:00 Root => Pelayo, Jorge, Hugo | 3/4
17:00 Apothebakery => sergio(3º visita), Laura(3º visita) | 2/4

Domingo 29
17:30 DnD => Adrian, Víctor y Enol | 3/3
`);
  });
};
