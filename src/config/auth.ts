import { Context } from 'telegraf';
import { Mongo } from 'src/class/mongo';
import { UserType, visitorTypes, memberTypes, adminTypes, ownerTypes } from 'src/types/user';

export const authGroupOnly = (ctx: Context, next: () => void) => {
  const chatId = ctx.chat?.id;
  const authGroups = process.env.AUTHORIZED_GROUPS?.split(',') || [];
  if (!!chatId && authGroups.includes(String(chatId))) return next();
  return ctx.reply('Este comando solo puede ser usado en el grupo autorizado.');
};

export const visitorOnly =
  (reqPrivate = true) =>
  async (ctx: Context, next: () => void) => {
    if (reqPrivate)
      if (!isPrivate(ctx))
        return ctx.reply('Este comando solo puede ser usado en un chat privado.');

    const { username: userName, id: userID, is_bot } = ctx.from || {};
    if (is_bot) return ctx.reply('Los bots no pueden usar este comando.');
    const user = await findUser({
      userID,
      userName,
      searchYypes: [...visitorTypes, ...memberTypes],
    });
    if (!user) return ctx.reply('No tienes permiso para usar este comando.');
    if (user) return next();
  };

export const membersOnly =
  (reqPrivate = true) =>
  async (ctx: Context, next: () => void) => {
    if (reqPrivate)
      if (!isPrivate(ctx))
        return ctx.reply('Este comando solo puede ser usado en un chat privado.');

    const { username: userName, id: userID, is_bot } = ctx.from || {};
    if (is_bot) return ctx.reply('Los bots no pueden usar este comando.');
    const user = await findUser({ userID, userName, searchYypes: memberTypes });
    if (!user) return ctx.reply('No tienes permiso para usar este comando.');
    if (user) return next();
  };

export const adminOnly =
  (reqPrivate = true) =>
  async (ctx: Context, next: () => void) => {
    if (reqPrivate)
      if (!isPrivate(ctx))
        return ctx.reply('Este comando solo puede ser usado en un chat privado.');

    const { username: userName, id: userID, is_bot } = ctx.from || {};
    if (is_bot) return ctx.reply('Los bots no pueden usar este comando.');
    const user = await findUser({ userID, userName, searchYypes: adminTypes });
    if (!user) return ctx.reply('No tienes permiso para usar este comando.');
    if (user) return next();
  };

export const ownerOnly =
  (reqPrivate = true) =>
  async (ctx: Context, next: () => void) => {
    if (reqPrivate)
      if (!isPrivate(ctx))
        return ctx.reply('Este comando solo puede ser usado en un chat privado.');

    const { username: userName, id: userID, is_bot } = ctx.from || {};
    if (is_bot) return ctx.reply('Los bots no pueden usar este comando.');
    const user = await findUser({ userID, userName, searchYypes: ownerTypes });
    if (!user) return ctx.reply('No tienes permiso para usar este comando.');
    if (user) return next();
  };

type FindUserParams = {
  userID?: number;
  userName?: string;
  searchYypes: UserType[];
};
export const findUser = async ({ userID, userName, searchYypes }: FindUserParams) => {
  let user;
  const db = await Mongo.getDb();
  user = await db.collection('users').findOne({ userID, type: { $in: searchYypes } });
  if (!user) {
    user = await db.collection('users').findOne({ userName, type: { $in: searchYypes } });
    if (user) await db.collection('users').updateOne({ userName }, { $set: { userID } });
  }
  return user;
};

const isPrivate = (ctx: Context) => {
  const chatType = ctx.chat?.type || '';
  return chatType === 'private';
};
