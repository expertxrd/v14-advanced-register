const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const setupSystem = require("../schemas/setupSystem.js")
const userData = require("../schemas/userStatistics.js")
module.exports = {
  slash: false,
  name: ["isimler"],

  async execute(client, message, args) {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let setupSystem2 = await setupSystem.findOne({ guildID: message.guild.id })
    let setupSystem3 = await userData.findOne({ guildID: message.guild.id, userID: member.id })
    const authorizedRoles = setupSystem2 && setupSystem2.AuthorizedRoles !== undefined ? setupSystem2.AuthorizedRoles : [];
    const check = message.guild.emojis.cache.find(e => e.name === "exsta_check");
    const reject = message.guild.emojis.cache.find(e => e.name === "exsta_reject");
    const loading = message.guild.emojis.cache.find(e => e.name === "exsta_loading");
  
    if (!check && !reject && !loading) {
      return;
    }
    if(!authorizedRoles.length > 0 ) { return message.react(reject) }

    if(!authorizedRoles.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { return message.react(reject)}

    if (!setupSystem3 || !setupSystem3.Username.length) {
      message.reply(`${member} kullanıcısına ait herhangi bir veri bulunamadı.`)
      message.react(reject)
      return;
    }
    const numNames = setupSystem3.Username.length;

    let description = '```ansi\n';
    
    for (let i = 0; i < numNames; i++) {
      description += `\n[2;30m[2;37m[1;37m${i + 1}.[0m[2;37m [0m[2;30m[0m[2;30m${setupSystem3.Sex[i]}[0m [2;34m${setupSystem3.NameAndAge[i]}[0m [2;37m[1;37m-[0m[2;37m[0m [2;36m@${setupSystem3.Staff[i]} [2;37m[1;37m- [0m[2;37m[0m[2;36m[0m[2;40m[2;37m${new Date(setupSystem3.Date[i]).toLocaleString('tr-TR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}[0m[2;40m[0m\n`;
    }
    
    description += '\n```';
    
    const embed = new EmbedBuilder().setDescription(description).setAuthor({ name: `@${member.user.username} kullanıcısına ait isim istatistikleri:`, iconURL: message.guild.iconURL()}).setThumbnail(message.guild.iconURL()).setColor("2b2d31");
    message.reply({ embeds: [embed] });
    message.react(check)
  }

  }