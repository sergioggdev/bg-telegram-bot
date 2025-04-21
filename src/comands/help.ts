import { Telegraf, Markup } from 'telegraf';

export const defineHelpCmd = (bot: Telegraf) => {
  bot.help(ctx => {
    const chatType = ctx.chat?.type || '';
    const isGroup = chatType.includes('group');

    const generalHelp = `
🎲 *Enclave Bot* 🎮

Este bot te ayuda a organizar y unirte a quedadas de juegos de mesa. Puedes ver eventos disponibles, crear nuevos, consultar detalles y apuntarte a los que te interesen.
`;

    const privateCommands = `
*Comandos disponibles en chat privado:*

/start - Inicia el bot y muestra el menú principal
/help - Muestra este mensaje de ayuda
/quedadas - Muestra las quedadas disponibles y te permite crear nuevas

*Funcionalidades:*
• Ver resumen de todas las quedadas en formato texto
• Consultar listado detallado de eventos disponibles
• Ver información específica de cada quedada (nombre, fecha, jugadores, etc.)
• Crear nuevas quedadas especificando detalles
• Apuntarte a eventos con plazas disponibles
`;

    const groupCommands = `
*Comandos disponibles en grupos:*

/quedadas - Abre un enlace para gestionar quedadas desde el chat privado
/help - Muestra este mensaje de ayuda

*Funcionalidades:*
• Ver un enlace directo para gestionar quedadas desde el chat privado
• Mantener organizada la información de eventos sin saturar el grupo
`;

    const helpText = generalHelp + (isGroup ? groupCommands : privateCommands);

    return ctx.reply(helpText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.callback('Ver quedadas', 'quedadas')]]),
    });
  });
};
