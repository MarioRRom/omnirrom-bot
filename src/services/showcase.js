//=================================================================
//   ▄▄▄▄                      ▄▄▄▄▄▄     ▄▄▄▄▄▄                  
// ▄█▀▀████▄                  █▀██▀▀▀█▄  █▀██▀▀▀█▄                
// ██    ██ ▄        ▄     ▀▀   ██▄▄▄█▀    ██▄▄▄█▀        ▄       
// ██    ██ ███▄███▄ ████▄ ██   ██▀▀█▄     ██▀▀█▄   ▄███▄ ███▄███▄
// ██    ██ ██ ██ ██ ██ ██ ██ ▄ ██  ██   ▄ ██  ██   ██ ██ ██ ██ ██
//  ▀████▀ ▄██ ██ ▀█▄██ ▀█▄██ ▀██▀  ▀██▀ ▀██▀  ▀██▀▄▀███▀▄██ ██ ▀█
//                  MarioRRom's discord server Bot
//             https://github.com/MarioRRom/omnirrom-bot/
//=================================================================


// Canal showcase para publicar setups.
// Valida imágenes y redirige replies a hilos.

const { get } = require('../config');

module.exports = async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  // Ignorar si no hay canal showcase configurado
  const showcaseChannel = await get('showcase_channel');
  if (!showcaseChannel) return;
  if (message.channel.id !== showcaseChannel) return;


  // Replies: redirigir a hilos
  if (message.reference) {
    const reply = await message.reply('💬 Para comentar esta publicación, crea un hilo en el mensaje original. Esto mantiene el canal ordenado.');
    setTimeout(() => {
      reply.delete().catch(console.error);
    }, 5000);
    return message.delete().catch(() => {});
  }


  // Posts nuevos: validar que tengan al menos una imagen
  const tieneImagen = message.attachments.some(att =>
    att.contentType?.startsWith('image/')
  );

  const tieneEmbedImagen = message.embeds.some(e => e.image);

  if (!tieneImagen && !tieneEmbedImagen) {
    const reply = await message.reply('⚠️ Para realizar una publicación en este canal, debes incluir al menos una imagen. Si deseas comentar o agregar contenido, crea un hilo en el mensaje original. Esto mantiene el canal ordenado.');
    setTimeout(() => {
      reply.delete().catch(console.error);
    }, 5000);
    return message.delete().catch(() => {});
  }

  // Reaccionar con corazón a posts válidos
  try {
    await message.react('❤️');
  } catch (err) {
    console.error('Error agregando reacción:', err);
  }
};