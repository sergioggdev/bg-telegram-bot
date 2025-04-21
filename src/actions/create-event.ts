import { Telegraf, Markup } from 'telegraf';

export const defineCreateEventAction = (bot: Telegraf) => {
  bot.action('create_event', async ctx => {
    await ctx.answerCbQuery();
    return ctx.editMessageText(
      'Para crear una quedada, responde a este mensaje con el siguiente formato:\n\n' +
        'Es necesario responder al mensaje, si escribes pero sin responder a este mensaje no funcionará.\n\n' +
        'Nombre del juego\n' +
        'Fecha de la quedada\n' +
        'Descripción del juego\n' +
        'Jugadores (separados por comas)\n' +
        'Máximo de jugadores\n\n' +
        'Ejemplo:\n' +
        'El Dorado\n' +
        'Jueves 26\n' +
        'Juego de estrategia sobre la búsqueda de tesoros en El Dorado.\n' +
        'Juan, Sara, Pedro, Laura\n' +
        '4\n\n' +
        '¡Esperando tu mensaje!',
    );
  });
};
