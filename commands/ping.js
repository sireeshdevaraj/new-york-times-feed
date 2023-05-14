const { SlashCommandBuilder } = require("discord.js");

const Data = new SlashCommandBuilder()
.setName('ping')
.setDescription('Check the Bots ping')

const execute = async (interaction) => {
    await interaction.reply('Pong...')
}

module.exports = {
    data:Data,
    execute
}