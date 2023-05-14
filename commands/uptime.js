const {SlashCommandBuilder} = require('discord.js')

const Data = new SlashCommandBuilder()
.setName('uptime')
.setDescription('Returns the uptime')

const execute = async (interaction) => {
    await interaction.reply(`It'been ${Math.round(interaction.client.uptime/(60*1000))}m since I was last ready`)
}

module.exports = {
    data:Data,
    execute

}