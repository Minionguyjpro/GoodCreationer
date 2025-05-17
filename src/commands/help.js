const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory
const commandsPath = path.join(__dirname);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== path.basename(__filename));

// Load each command's data
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command && command.data && command.data.name) {
        commands.push({
            name: command.data.name,
            description: command.data.description || 'No description provided.'
        });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all commands and their descriptions.'),
    async execute(interaction) {
        const commandList = commands.map(command => {
            return `**/${command.name}**: ${command.description}`;
        }).join('\n');

        await interaction.reply(`Here are all the available commands:\n- ${commandList}`);
    }
}