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


// Canal honeypot anti-spam.
// Detecta cuentas comprometidas, borra sus mensajes recientes y
// las desbanea automáticamente.

const { get } = require('../config');

module.exports = async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  // Ignorar si no hay canal honeypot configurado
  const honeypotChannel = await get('honeypot_channel');
  if (!honeypotChannel) return;
  if (message.channel.id !== honeypotChannel) return;

  try {
    await message.delete();

    // Banear para borrar mensajes recientes, luego desbanear
    await message.guild.members.ban(message.author.id, {
      deleteMessageSeconds: 86400,
      reason: 'Honeypot: posible cuenta comprometida enviando spam'
    });

    // Esperar a que Discord procese el borrado antes de desbanear
    await new Promise(resolve => setTimeout(resolve, 5000));

    await message.guild.members.unban(message.author.id, 'Auto-unban por posible falso positivo');
  } catch (err) {
    if (err.code === 50013) {
      message.channel.send('⚠️ El bot no tiene permiso **Ban Members**.').catch(() => {});
    }
    console.error('Error en honeypot:', err);
  }
};