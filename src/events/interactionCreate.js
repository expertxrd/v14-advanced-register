const { EmbedBuilder, ActionRowBuilder, Collection } = require('discord.js');
const icooldown = new Collection();
const Config = require('../../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.slashcommands.get(interaction.commandName);

            if (!command) return;

            try {
                command.execute(client, interaction);
            } catch (error) {
                console.error(error);
            }
        }
    },
};