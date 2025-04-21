import { Telegraf } from 'telegraf';

export const defineCommandsList = (bot: Telegraf) => {
  bot.telegram.setMyCommands(
    [
      { command: 'quedadas', description: 'Ver y crear quedadas' },
      { command: 'users', description: 'Ver usuarios' },
      { command: 'perfil', description: 'Ver tu perfil' },
      { command: 'start', description: 'Iniciar el bot' },
      { command: 'help', description: 'Mostrar ayuda' },
    ],
    { scope: { type: 'all_private_chats' } },
  );

  bot.telegram.setMyCommands(
    [{ command: 'quedadas', description: 'Unirse a quedadas desde el grupo' }],
    { scope: { type: 'all_group_chats' } },
  );
};
