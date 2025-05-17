const { SlashCommandBuilder } = require('discord.js');
const Ping = require('net-ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Returns the bot's latency to Discord servers."),
    async execute(interaction) {
        try {
            const session = Ping.createSession();
            session.pingHost('162.159.138.232', async function (err, _data, sent, rcvd) {
                if (err) {
                    console.error('Ping error:', err);
                    await interaction.reply({ content: 'Failed to ping the server.', ephemeral: true });
                    return;
                }
                const ms = rcvd - sent;
                await interaction.reply(`Pong! The bot's latency is **${ms}ms**!`);
            });
        } catch (error) {
            console.error('Error executing the ping command:', error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};