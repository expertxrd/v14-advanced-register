const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionFlagsBits, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const Config = require("../../config.json")
const setupSystem = require("../schemas/setupSystem.js")
const staffData = require("../schemas/registerStatistics.js")

module.exports = {
  slash: false,
  name: ["leaderboard"],
  
async execute(client, message, args) { 
  
  let setupSystem2 = await setupSystem.findOne({ guildID: message.guild.id })
  const authorizedRoles = setupSystem2 && setupSystem2.AuthorizedRoles !== undefined ? setupSystem2.AuthorizedRoles : [];
  const check = message.guild.emojis.cache.find(e => e.name === "exsta_check");
  const reject = message.guild.emojis.cache.find(e => e.name === "exsta_reject");
  const loading = message.guild.emojis.cache.find(e => e.name === "exsta_loading");

  if (!check && !reject && !loading) {
    return;
  }
  if(!authorizedRoles.length > 0 ) { return message.react(reject) }

  if(!authorizedRoles.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator)) { return message.react(reject)}
  async function leaderboardCommand(message) {
    try {
      let data = await staffData.find({ guildID: message.guild.id });
  
      data.sort((a, b) => (b.manStats + b.womanStats) - (a.manStats + a.womanStats));
  
      let leaderboardMessage = '```ansi\n';
      data.forEach((user, index) => {
        leaderboardMessage += `\u001b[2;36m\u001b[2;37m${index + 1}. \u001b[0m\u001b[2;36m\u001b[0m\u001b[2;36m\u001b[1;36m@${client.users.cache.get(user.userID).username}\u001b[0m\u001b[2;36m \u001b[2;37m-\u001b[0m\u001b[2;36m \u001b[0m\u001b[2;34m\u001b[2;32m\u001b[1;32m${user.manStats + user.womanStats}\u001b[0m\u001b[2;32m Kayıt \u001b[2;37m\u001b[0m\u001b[2;32m\u001b[0m\u001b[2;34m\u001b[0m\u001b[2;37m(${user.manStats} \u001b[2;34m\u001b[1;34m♂\u001b[0;34m\u001b[0;30m,\u001b[0m\u001b[0;34m \u001b[0m\u001b[1;34m\u001b[0m\u001b[2;34m\u001b[0m\u001b[2;37m\u001b[0m\u001b[2;37m${user.womanStats} \u001b[2;35m\u001b[1;35m♀\u001b[0m\u001b[2;35m\u001b[0m\u001b[2;37m\u001b[0m\u001b[2;37m)\u001b[0m\n`;
      });
      leaderboardMessage += '```';
  
      const leaderboardEmbed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setDescription(leaderboardMessage)
        .setAuthor({ name: `${message.guild.name} | Toplam kayıt sıralaması:`, iconURL: message.guild.iconURL()})
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: `Developed by Exsta`, iconURL: message.author.avatarURL()})
  
      message.channel.send({ embeds: [leaderboardEmbed] });
    } catch (error) {
      console.error('Leaderboard komutu hatası:', error);
      message.channel.send('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
  
  leaderboardCommand(message);
    
  }
}