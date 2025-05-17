const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('address')
        .setDescription('Displays the server address and port.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('java')
                .setDescription('Get the Java Edition server address.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bedrock')
                .setDescription('Get the Bedrock Edition server address.')
        ),
    async execute(interaction) {
        try {
            const subcommand = interaction.options.getSubcommand();

            // Ensure subcommand is a valid string
            if (typeof subcommand !== 'string') {
                throw new Error('Invalid subcommand');
            }

            // Capitalize the first letter of the subcommand
            const capitalizedSubcommand = subcommand.charAt(0).toUpperCase() + subcommand.slice(1);

            // Reply with the server address and port
            await interaction.reply({
                content: `You can join our server with ${capitalizedSubcommand} Edition at \`goodcreations.dedyn.io\`. ${
                    subcommand === 'java'
                        ? "That's all you need to specify."
                        : "Leave the default port as `19132` and you're done."
                } Enjoy playing!`,
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
};