import { visitorRole } from 'src/config';
import { Telegraf, Markup } from 'telegraf';

export const defineGroupsCmd = (bot: Telegraf) => {
  bot.command('grupos', visitorRole(false), ctx => {
    const chatType = ctx.chat?.type || '';

    const helpText = `
<b>Canales disponibles de Enclave:</b>

<b>Gneral</b>:
https://t.me/+1kpGzEkSBuxhYTY0

<b>Republica Roma</b>:
https://t.me/+1kpGzEkSBuxhYTY0

<b>Dead of enclave</b>:
https://t.me/+tGb0dkpmcMM2M2Q0

<b>Enclave Arkham horror LCG</b>:
https://t.me/+3U_Qn4Tr0zQzN2Rk

<b>Enclave de Insondable</b>:
https://t.me/+bJ8jE0Ix4eg5Mjlk

<b>Enclave One Peace</b>:
https://t.me/+lJtuQIOtm9sxNjJk

<b>Blood on the Enclave Tower</b>:
https://t.me/+Tb_FyoVeMOAyMTk8
`;

    return ctx.reply(helpText, { parse_mode: 'HTML', disable_web_page_preview: true });
  });
};
