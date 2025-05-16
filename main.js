const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Respond to interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

// Login to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);