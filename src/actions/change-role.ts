import { Mongo } from 'src/class/mongo';
import { adminRole } from 'src/config';
import { Telegraf, Markup } from 'telegraf';

export const defineChangeRoleAction = (bot: Telegraf) => {
  bot.action(/^change_role_(.+)$/, adminRole(), async ctx => {
    await ctx.answerCbQuery();
    const eventId = ctx.match[1];
    const [role, userName] = eventId.split('_');

    const db = await Mongo.getDb();
    const user = await db.collection('users').findOne({ userName });

    if (!user) return ctx.reply(`Usuario ${userName} no encontrado en la base de datos.`);
    await db.collection('users').updateOne({ userName }, { $set: { type: role } });
    return ctx.reply(`Usuario ${userName} modificado correctamente al rol ${role}!`);
  });
};
