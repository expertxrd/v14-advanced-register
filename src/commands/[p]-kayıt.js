const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputStyle,
    TextInputBuilder,
    Events,
    ComponentType,
    PermissionFlagsBits
} = require("discord.js");
const Config = require("../../config.json")
const setupSystem = require("../schemas/setupSystem.js")
const staffData = require("../schemas/registerStatistics.js")
const userData = require("../schemas/userStatistics.js")

module.exports = {
    slash: false,
    name: ["kayıt"],

    async execute(client, message, args) {
        let setupSystem1 = setupSystem.findOne({ guildID: message.guild.id })
        let setupSystem2 = await setupSystem.findOne({ guildID: message.guild.id })
        let setupSystem3 = staffData.findOne({ guildID: message.guild.id, userID: message.author.id })
        let setupSystem4 = userData.findOne({ guildID: message.guild.id, userID: message.author.id })
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      args = args.filter(a => a !== "" && a !== " ").splice(1);
      const manRoles = setupSystem2 && setupSystem2.ManRoles !== undefined ? setupSystem2.ManRoles : [];
      const womanRoles = setupSystem2 && setupSystem2.WomanRoles !== undefined ? setupSystem2.WomanRoles : [];
      const authorizedRoles = setupSystem2 && setupSystem2.AuthorizedRoles !== undefined ? setupSystem2.AuthorizedRoles : [];
      const unregisterRoles = setupSystem2 && setupSystem2.UnregisterRoles !== undefined ? setupSystem2.UnregisterRoles : [];
      const registerLogChannel = setupSystem2 && setupSystem2.logChannel !== undefined ? setupSystem2.logChannel : "";
      if(!manRoles.length > 0 || !unregisterRoles.length > 0 || !authorizedRoles.length > 0 || !womanRoles.length > 0 || !registerLogChannel) {
        return;
      }
      let name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
      let age = args.filter(arg => !isNaN(arg))[0] || undefined;
      const check = message.guild.emojis.cache.find(e => e.name === "exsta_check");
      const reject = message.guild.emojis.cache.find(e => e.name === "exsta_reject");
      const loading = message.guild.emojis.cache.find(e => e.name === "exsta_loading");
      const man = message.guild.emojis.cache.find(e => e.name === "exsta_man");
      const woman = message.guild.emojis.cache.find(e => e.name === "exsta_woman");
      const nicks = message.guild.emojis.cache.find(e => e.name === "exsta_nicks");
      if (!check && !reject && !loading && !man && !woman && !nicks) {
        return;
      }
      if (!member || !name || !age) return message.react(reject)

      if(!authorizedRoles.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator)) { return message.react(reject)}

        // /////BUTON KISMI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const registerButton1 = new ButtonBuilder().setCustomId("registerButton1").setStyle(ButtonStyle.Primary).setLabel("Erkek").setEmoji(man.id);

        const registerButton2 = new ButtonBuilder().setCustomId("registerButton2").setLabel("Kadın").setStyle(ButtonStyle.Danger).setEmoji(woman.id);

        const registerButton3 = new ButtonBuilder().setCustomId("registerButton3").setStyle(ButtonStyle.Secondary).setEmoji(nicks.id);

        const registerButton4 = new ButtonBuilder().setCustomId("registerButton4").setEmoji(reject.id).setStyle(ButtonStyle.Secondary);

        const fivethActionRow = new ActionRowBuilder().addComponents([registerButton1, registerButton2, registerButton3, registerButton4]);

        // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // /////EMBED KISMI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const registerEmbed1 = new EmbedBuilder().setAuthor({name: message.guild.name, iconURL: message.guild.iconURL()}).setFooter({text: `Developed by Exsta`, iconURL: message.author.displayAvatarURL()}).setColor("#2b2d31").setTimestamp().setDescription(`${member} kullanıcısını butonlarla etkileşime geçerek kayıt edebilirsiniz.`);

        // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // /////GÖNDERME KISMI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const msg = await message.reply({embeds: [registerEmbed1], components: [fivethActionRow]});
        message.react(loading)

        // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const collector = message.channel.createMessageComponentCollector({time: 30000});
        collector.on("collect", async (i, reaction) => {
            if (i.isButton()) {
                if (i.customId === "registerButton1") {
                    if (i.user.id != message.author.id) {
                        return await i.reply({content: "Bu butonları sadece ilgili kişiler kullanabilir.", ephemeral: true});
                    }
                    await i.reply({ content: `Kayıt işlemi başarıyla tamamlandı.`, ephemeral: true })
                    let simdikiZaman = Date.now();

let olusturulanTarihFormatli = new Date(simdikiZaman).toLocaleString('tr-TR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
                    const embeddd = new EmbedBuilder()
                    .setAuthor({ name: i.guild.name, iconURL: i.guild.iconURL() })
                    .setColor("#2b2d31")
                    .setThumbnail(i.guild.iconURL())
                    .setDescription(
`
- **${member} kullanıcısı başarıyla kayıt edildi.**
\`\`\`ansi
[2;36mİsim & Yaş:[0m [2;37m${name}[0m [2;30m|[0m [2;37m${age} -[0m[2;31m[2;37m ([2;30m${member.user.username}[0m[2;37m)
[2;36mCinsiyet[0m[2;37m[2;34m[2;36m:[0m[2;34m[0m[2;37m [2;34mErkek [0m[2;37m[0m[2;31m[0m[2;30m♂
[2;36mYetkili: [2;32m[2;33m${message.author.username} [2;37m-[0m[2;33m [2;37m([0m[2;33m[2;30m${message.author.id}[2;37m)[0m[2;30m[0m[2;33m
[2;36mTarih: [0m[2;33m[0m[2;32m[0m[2;36m[0m[2;30m[0m[2;32m[2;47m[2;40m[2;41m[2;43m[2;45m[2;40m${olusturulanTarihFormatli}[0m[2;32m[2;45m[0m[2;32m[2;43m[0m[2;32m[2;41m[0m[2;32m[2;40m[0m[2;32m[2;47m[0m[2;32m[0m[2;36m[0m
\`\`\`
`)
registerButton1.setDisabled(true);
registerButton2.setDisabled(true);
registerButton3.setDisabled(false);
registerButton4.setDisabled(true);
await setupSystem3.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { manStats: 1, totalStats: 1 }, $set: {lastUser: member.id, lastUserDate: Date.now(), lastUserNameAndAge: `${name} | ${age}`}}, { upsert: true }).exec();
await setupSystem4.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $push: { Username: member.user.username, NameAndAge: `${name} | ${age}`, Staff: message.author.username, Date: Date.now(), Sex: `♂` }}, { upsert: true }).exec();
                    if(manRoles.length > 0)member.roles.set(manRoles)
                    await member.setNickname(`${name} | ${age}`)
                    await msg.edit({ embeds: [embeddd] ,components: [fivethActionRow]});
                    await message.reactions.removeAll()
                    await message.react(check)
                }
                if (i.customId === "registerButton2") {
                    if (i.user.id != message.author.id) {
                        return await i.reply({content: "Bu butonları sadece ilgili kişiler kullanabilir.", ephemeral: true});
                    }
                    await i.reply({ content: `Kayıt işlemi başarıyla tamamlandı.`, ephemeral: true })
                    let simdikiZaman = Date.now();

let olusturulanTarihFormatli = new Date(simdikiZaman).toLocaleString('tr-TR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
                    const embeddd = new EmbedBuilder()
                    .setAuthor({ name: i.guild.name, iconURL: i.guild.iconURL() })
                    .setColor("#2b2d31")
                    .setThumbnail(i.guild.iconURL())
                    .setDescription(
`
- **${member} kullanıcısı başarıyla kayıt edildi.**
\`\`\`ansi
[2;36mİsim & Yaş:[0m [2;37m${name}[0m [2;30m|[0m [2;37m${age} -[0m[2;31m[2;37m ([2;30m${member.user.username}[0m[2;37m)
[2;36mCinsiyet[0m[2;37m[2;34m[2;36m:[0m[2;34m[0m[2;37m [2;34m[2;35mKadın [0m[2;34m[0m[2;37m[0m[2;31m[0m[2;30m♀[0m
[2;36mYetkili: [2;32m[2;33m${message.author.username} [2;37m-[0m[2;33m [2;37m([0m[2;33m[2;30m${message.author.id}[2;37m)[0m[2;30m[0m[2;33m
[2;36mTarih: [0m[2;33m[0m[2;32m[0m[2;36m[0m[2;32m[2;47m[2;40m[2;41m[2;43m[2;45m[2;40m${olusturulanTarihFormatli}[0m[2;32m[2;45m[0m[2;32m[2;43m[0m[2;32m[2;41m[0m[2;32m[2;40m[0m[2;32m[2;47m[0m[2;32m[0m[2;36m[0m
\`\`\`
`)
registerButton1.setDisabled(true);
registerButton2.setDisabled(true);
registerButton3.setDisabled(false);
registerButton4.setDisabled(true);
await setupSystem4.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $push: { Username: member.user.username, NameAndAge: `${name} | ${age}`, Staff: message.author.username, Date: Date.now(), Sex: `♀️` }}, { upsert: true }).exec();
                    if(womanRoles.length > 0)member.roles.set(womanRoles)
                    await member.setNickname(`${name} | ${age}`)
                    await msg.edit({ embeds: [embeddd] ,components: [fivethActionRow]});
                    await message.reactions.removeAll()
                    await message.react(check)
                    await setupSystem3.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { womanStats: 1, totalStats: 1 }, $set: {lastUser: member.id, lastUserDate: Date.now(), lastUserNameAndAge: `${name} | ${age}`}}, { upsert: true }).exec();
                }
                if (i.customId === "registerButton3") {
                    let setupSystem3 = await userData.findOne({ guildID: message.guild.id, userID: member.id })
                    if (i.user.id != message.author.id) {
                        return await i.reply({content: "Bu butonları sadece ilgili kişiler kullanabilir.", ephemeral: true});
                    }
                    if (!setupSystem3 || !setupSystem3.Username.length) {
                        return i.reply({ content: `${member} kullanıcısına ait herhangi bir veri bulunamadı.`, ephemeral: true});
                      }
                  
                      const numNames = setupSystem3.Username.length;
                  
                      let description = '```ansi\n';
                      
                      for (let i = 0; i < numNames; i++) {
                        description += `\n[2;30m[2;37m[1;37m${i + 1}.[0m[2;37m [0m[2;30m[0m[2;30m${setupSystem3.Sex[i]}[0m [2;34m${setupSystem3.NameAndAge[i]}[0m [2;37m[1;37m-[0m[2;37m[0m [2;36m@${setupSystem3.Staff[i]} [2;37m[1;37m- [0m[2;37m[0m[2;36m[0m[2;40m[2;37m${new Date(setupSystem3.Date[i]).toLocaleString('tr-TR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}[0m[2;40m[0m\n`;
                      }
                      
                      description += '\n```';
                      
                      const embed = new EmbedBuilder().setDescription(description).setAuthor({ name: `@${member.user.username} kullanıcısına ait isim istatistikleri:`, iconURL: message.guild.iconURL()}).setThumbnail(message.guild.iconURL()).setColor("2b2d31");
                      i.reply({ embeds: [embed], ephemeral: true });
                }
            }
        });
        collector.on('end', (collected, reason) => {
            registerButton1.setDisabled(true);
            registerButton2.setDisabled(true);
            registerButton3.setDisabled(true);
            registerButton4.setDisabled(true);
            msg.edit({ components: [fivethActionRow] })
              });
    }
};
