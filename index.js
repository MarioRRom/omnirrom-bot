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


require('dotenv').config();

// Discord.js
const { Client, GatewayIntentBits, Events, MessageFlags, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');


//  .-------------------------.
//  | .---------------------. |
//  | |       Cliente       | |
//  | `---------------------' |
//  `-------------------------'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


//  .-------------------------.
//  | .---------------------. |
//  | |      Comandos       | |
//  | `---------------------' |
//  `-------------------------'

// Recorrer src/commands y cargar cada archivo como un comando slash
const commands = {};
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands[command.data.name] = command.execute;
}


//  .-------------------------.
//  | .---------------------. |
//  | |       Eventos       | |
//  | `---------------------' |
//  `-------------------------'

// Ready
client.once(Events.ClientReady, () => {
  console.log(`
=================================================================
   ▄▄▄▄                      ▄▄▄▄▄▄     ▄▄▄▄▄▄                  
 ▄█▀▀████▄                  █▀██▀▀▀█▄  █▀██▀▀▀█▄                
 ██    ██ ▄        ▄     ▀▀   ██▄▄▄█▀    ██▄▄▄█▀        ▄       
 ██    ██ ███▄███▄ ████▄ ██   ██▀▀█▄     ██▀▀█▄   ▄███▄ ███▄███▄
 ██    ██ ██ ██ ██ ██ ██ ██ ▄ ██  ██   ▄ ██  ██   ██ ██ ██ ██ ██
  ▀████▀ ▄██ ██ ▀█▄██ ▀█▄██ ▀██▀  ▀██▀ ▀██▀  ▀██▀▄▀███▀▄██ ██ ▀█
                  MarioRRom's discord server Bot
             https://github.com/MarioRRom/omnirrom-bot/
=================================================================
`);
  console.log(`Conectado como ${client.user.tag}`);

  // Verificar permisos necesarios al iniciar
  for (const guild of client.guilds.cache.values()) {
    if (!guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      console.warn(`[${guild.name}] Falta permiso: Ban Members`);
    }
  }
});

// Interacciones (comandos slash)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands[interaction.commandName];
  if (!command) return;

  try {
    await command(interaction);
  } catch (error) {
    console.error(`Error en comando ${interaction.commandName}:`, error);
    try {
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: '❌ Ocurrió un error.', flags: MessageFlags.Ephemeral });
      }
    } catch (replyError) {
      console.error('Error al enviar respuesta de error:', replyError);
    }
  }
});

// Mensajes
const showcaseHandler = require('./src/services/showcase');
const honeypotHandler = require('./src/services/honeypot');

client.on('messageCreate', async (message) => {
  await showcaseHandler(message);
  await honeypotHandler(message);
});


//  .-------------------------.
//  | .---------------------. |
//  | |      LifeCycle      | |
//  | `---------------------' |
//  `-------------------------'

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled promise rejection:', err);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando sesión...');
  client.destroy();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido, cerrando sesión...');
  client.destroy();
  process.exit(0);
});