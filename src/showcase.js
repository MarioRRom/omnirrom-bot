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


const { get } = require('./config');

module.exports = async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const showcaseChannel = await get('showcase_channel');
  if (!showcaseChannel) return;

  if (message.channel.id !== showcaseChannel) return;

  // Si es una reply a un mensaje en el showcase
  if (message.reference) {
    const reply = await message.reply('💬 Para comentar esta publicación, crea un hilo en el mensaje original. Esto mantiene el canal ordenado.');
    setTimeout(() => {
      reply.delete().catch(console.error);
    }, 5000);
    return message.delete();
  }

  // Validar imagen para posts nuevos
  const tieneImagen = message.attachments.some(att =>
    att.contentType?.startsWith('image/')
  );

  const tieneEmbedImagen = message.embeds.some(e => e.image);

  if (!tieneImagen && !tieneEmbedImagen) {
    const reply = await message.reply('⚠️ Solo se permiten imágenes en este canal.');
    setTimeout(() => {
      reply.delete().catch(console.error);
    }, 5000);
    return message.delete();
  }

  // No crear hilo automáticamente, solo permitir replies para crear hilos
  // Agregar reacción de corazón para likes
  try {
    await message.react('❤️');
  } catch (err) {
    console.error('Error agregando reacción:', err);
  }
};