const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Displays the current version of the server.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('java')
                .setDescription('Get the version of the Java side of the server.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bedrock')
                .setDescription('Get the version of the Bedrock side of the server.')
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        let apiUrl;

        // Determine the API URL based on the subcommand
        if (subcommand === 'java') {
            apiUrl = 'https://api.mcsrvstat.us/3/' + process.env.MINECRAFT_SERVER_ADDRESS;
        } else if (subcommand === 'bedrock') {
            apiUrl = 'https://api.mcsrvstat.us/bedrock/3/' + process.env.MINECRAFT_SERVER_ADDRESS;
        }

        try {
            // Fetch the JSON data from the API
            const response = await fetch(apiUrl);

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON data
            const data = await response.json();

            // Extract the version information (adjust based on your API's structure)
            const version = data.version || 'Unknown version';

            // Capitalize the first letter of the subcommand
            const capitalizedSubcommand = subcommand.charAt(0).toUpperCase() + subcommand.slice(1);

            // Reply to the interaction with the version information
            await interaction.reply(`You can join our server with ${capitalizedSubcommand} Edition. To be able to join, make sure you're on version ${version}! If this seems like an outdated version for you, don't bother to ask me to update ${subcommand === 'java' ? 'the Purpur server software' : 'Geyser'}!`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Failed to fetch the ${capitalizedSubcommand} Edition server version.`, ephemeral: true });
        }
    }
};