const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const Config = require("../../config.json")
const setupSystem = require("../schemas/setupSystem.js")
const staffData = require("../schemas/registerStatistics.js")
module.exports = {
  slash: false,
  name: ["stats"],
  
async execute(client, message, args) { 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let setupSystem2 = await setupSystem.findOne({ guildID: message.guild.id })
    let setupSystem3 = await staffData.findOne({ guildID: message.guild.id, userID: member.id })
    let setupSystem4 = staffData.findOne({ guildID: message.guild.id, userID: member.id })
    const authorizedRoles = setupSystem2 && setupSystem2.AuthorizedRoles !== undefined ? setupSystem2.AuthorizedRoles : [];
    const check = message.guild.emojis.cache.find(e => e.name === "exsta_check");
    const reject = message.guild.emojis.cache.find(e => e.name === "exsta_reject");
    const loading = message.guild.emojis.cache.find(e => e.name === "exsta_loading");
    const zero = message.guild.emojis.cache.find(e => e.name === "exsta_zero");
    const one = message.guild.emojis.cache.find(e => e.name === "exsta_one");
    const two = message.guild.emojis.cache.find(e => e.name === "exsta_two");
    const three = message.guild.emojis.cache.find(e => e.name === "exsta_three");
    const four = message.guild.emojis.cache.find(e => e.name === "exsta_four");
    const five = message.guild.emojis.cache.find(e => e.name === "exsta_five");
    const six = message.guild.emojis.cache.find(e => e.name === "exsta_six");
    const seven = message.guild.emojis.cache.find(e => e.name === "exsta_seven");
    const eight = message.guild.emojis.cache.find(e => e.name === "exsta_eight");
    const nine = message.guild.emojis.cache.find(e => e.name === "exsta_nine");
  
    if (!check && !reject && !loading && !zero && !one && !two && !three && !four && !five && !six && !seven && !eight && !nine ) {
      return;
    }
    if(!authorizedRoles.length > 0 ) { return; }

    if(!authorizedRoles.some(aha => message.member.roles.cache.get(aha)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { return message.react(reject)}
    if(!authorizedRoles.some(aha => member.roles.cache.get(aha))) { return message.react(reject)}

    const manStats = setupSystem3 && setupSystem3.manStats !== undefined ? setupSystem3.manStats : 0;
    const womanStats = setupSystem3 && setupSystem3.womanStats !== undefined ? setupSystem3.womanStats : 0;
    const totalStats = setupSystem3 && setupSystem3.totalStats !== undefined ? setupSystem3.totalStats : 0;
    const lastUser = setupSystem3 && setupSystem3.lastUser !== undefined ? setupSystem3.lastUser : null;
    const lastUserNameAndAge = setupSystem3 && setupSystem3.lastUserNameAndAge !== undefined ? setupSystem3.lastUserNameAndAge : null;
    const lastUserDate = setupSystem3 && setupSystem3.lastUserDate !== undefined ? setupSystem3.lastUserDate : null;

    let user;

    if (lastUser) {
      user = client.users.cache.get(lastUser)?.username;
    } else {
      user = "undefined";
    }

    const zeroo = `<:${zero.name}:${zero.id}>`
    const onee = `<:${one.name}:${one.id}>`
    const twoo = `<:${two.name}:${two.id}>`
    const threee = `<:${three.name}:${three.id}>`
    const fourr = `<:${four.name}:${four.id}>`
    const fivee = `<:${five.name}:${five.id}>`
    const sixx = `<:${six.name}:${six.id}>`
    const sevenn = `<:${seven.name}:${seven.id}>`
    const eightt = `<:${eight.name}:${eight.id}>`
    const ninee = `<:${nine.name}:${nine.id}>`

    const emojiMap3 = {
        '0': zeroo,
        '1': onee,
        '2': twoo,
        '3': threee,
        '4': fourr,
        '5': fivee,
        '6': sixx,
        '7': sevenn,
        '8': eightt,
        '9': ninee
    };
    
    const totalStatsString = totalStats.toString();
    
    let totalEmojis = '';
    for (let i = 0; i < totalStatsString.length; i++) {
        const digit = totalStatsString[i];
        totalEmojis += emojiMap3[digit];
    }

const emojiMap2 = {
    '0': zeroo,
    '1': onee,
    '2': twoo,
    '3': threee,
    '4': fourr,
    '5': fivee,
    '6': sixx,
    '7': sevenn,
    '8': eightt,
    '9': ninee
};

const manStatsString = manStats.toString();

let manEmojis = '';
for (let i = 0; i < manStatsString.length; i++) {
    const digit = manStatsString[i];
    manEmojis += emojiMap2[digit];
}

const emojiMap = {
    '0': zeroo,
    '1': onee,
    '2': twoo,
    '3': threee,
    '4': fourr,
    '5': fivee,
    '6': sixx,
    '7': sevenn,
    '8': eightt,
    '9': ninee
};

const womanStatsString = womanStats.toString();

let womanEmojis = '';
for (let i = 0; i < womanStatsString.length; i++) {
    const digit = womanStatsString[i];
    womanEmojis += emojiMap[digit];
}
let olusturulanTarihFormatli = new Date(lastUserDate).toLocaleString('tr-TR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });

  
  const Embed = new EmbedBuilder()
    .setColor("#2b2d31")
    .setAuthor({name: `${message.guild.name} | @${message.author.username}`, iconURL: message.guild.iconURL()}) 
    .setDescription(
`
**<@${member.id}> yetkilisinin kayıt istatistikleri:**
- **[Erkek kayıt sayısı:](<https://discord.gg/altyapilar>)** ${manEmojis}
- **[Kadın kayıt sayısı:](<https://discord.gg/altyapilar>)** ${womanEmojis}
- **[Toplam kayıt sayısı:](<https://discord.gg/altyapilar>)** ${totalEmojis}
\`\`\`ansi
[2;34m[2;36m@${user} [2;37m-[0m[2;36m [2;33m${lastUserNameAndAge} [2;37m-[0m[2;33m [0m[2;36m[0m[2;34m[0m[2;40m${olusturulanTarihFormatli}[0m
\`\`\`
`)
    .setFooter({text: message.author.username, iconURL: message.author.avatarURL()})
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
  await message.reply({embeds: [Embed]})
    await message.react(check)
  }
}