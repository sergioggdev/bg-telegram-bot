import { Mongo } from 'src/class/mongo';
import { Context, Markup } from 'telegraf';
import { findUser } from 'src/config';
import { adminTypes } from 'src/types/user';
import e from 'express';

// Función de utilidad para procesar respuestas de búsqueda de usuarios
export const handleCreateUserReply = async (ctx: Context) => {
  try {
    let [name, surname, userName] = (ctx.message as any).text.trim().split('\n');
    if (userName.startsWith('@')) userName = userName.slice(1);

    if (!name || !userName || !surname)
      return ctx.reply(
        `Por favor, proporciona el nombre, apellido y nombre de usuario en el siguiente formato:\n\n*Nombre*\n*Apellido*\n@*NombreUsuario*`,
      );

    const db = await Mongo.getDb();
    const user = await db.collection('users').findOne({ userName });
    if (user) return ctx.reply('El nombre de usuario ya existe. Por favor, elige otro.');

    await db.collection('users').insertOne({
      name,
      surname,
      userName,
      type: 'visitor',
      visits: 0,
    });

    return ctx.reply(`👥 *USUARIO CREADO*\n\n Nombre: ${name}\nApellidos: ${surname}\n@NombreUsuario: ${userName}`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('Ascender a Miembro', `change_role_member_${userName}`)],
        [Markup.button.callback('Deshabilitar Usuario', `change_role_disable_${userName}`)],
      ]),
    });
  } catch (error) {
    return ctx.reply('Hubo un error al procesar tu búsqueda. Por favor, inténtalo de nuevo.');
  }
};
