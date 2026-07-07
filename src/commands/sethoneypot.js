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


// Comando /sethoneypot.
// Configura el canal honeypot anti-spam.

const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const { set } = require('../config');

// Definición del comando
module.exports = {
  data: new SlashCommandBuilder()
    .setName('sethoneypot')
    .setDescription('Configura el canal honeypot para detectar cuentas comprometidas')
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Canal donde los spammers serán baneados automáticamente')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  // Ejecución
  execute: async (interaction) => {
    await interaction.deferReply();
    const channel = interaction.options.getChannel('canal');

    await set('honeypot_channel', channel.id);

    // Dejar advertencia visible en el canal
    await channel.send('⚠️ **ADVERTENCIA:** ⚠️\nNo escribas en este canal! Es un honeypot para detectar cuentas comprometidas enviando spam. Serás baneado automáticamente si escribes aquí.');

    await interaction.editReply(`🐝 Canal honeypot configurado: ${channel}`);
  }
};
