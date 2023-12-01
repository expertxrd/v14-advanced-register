const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const Config = require("../../config.json")

module.exports = {
  slash: false,
  name: ["yardım"],
  
async execute(client, message, args) { 
  
  const Embed = new EmbedBuilder()
    .setColor("Blurple")
    .setAuthor({name: `${client.user.username} | Yardım menüsü`, iconURL: client.user.avatarURL()}) 
    .setDescription(`Prefix komut örneği`)
    .setFooter({text: message.author.username, iconURL: message.author.avatarURL()})
    .setTimestamp()
  await message.reply({embeds: [Embed]})
    
  }
}