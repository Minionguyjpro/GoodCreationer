const { SlashCommandBuilder } = require('discord.js');
const Ping = require('net-ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Returns the bot's latency to Discord servers."),
    async execute(interaction) {
        var session = Ping.createSession();
        session.pingHost('162.159.138.232', async function (err, data, sent, rcvd) {
            var ms = rcvd - sent;
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                await interaction.reply("The bot's ping latency is " + ms + 'ms!');
            }
        });
    },
};