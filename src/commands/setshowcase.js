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


const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { set } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setshowcase')
    .setDescription('Configura el canal de showcase')
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Canal donde se enviarán los setups')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  execute: async (interaction) => {
    await interaction.deferReply();
    const channel = interaction.options.getChannel('canal');

    await set('showcase_channel', channel.id);

    await interaction.editReply(`✅ Canal configurado: ${channel}`);
  }
};