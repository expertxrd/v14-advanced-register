const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, Collection, ContextMenuCommandBuilder, PermissionFlagsBits } = require ("discord.js")
const Config = require("../../config.json")
const setupSystem = require("../schemas/setupSystem.js")
const userData = require("../schemas/userStatistics.js")

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
      const systemData = await setupSystem.findOne({ guildID: member.guild.id })
      const registerChannel = systemData && systemData.welcomeChannel !== undefined ? systemData.welcomeChannel : "";
      const staffRole = systemData && systemData.AuthorizedRoles !== undefined ? systemData.AuthorizedRoles : [];
      const unregisterRole = systemData && systemData.UnregisterRoles !== undefined ? systemData.UnregisterRoles : [];

      if(!registerChannel || !unregisterRole.length > 0 || !staffRole.length > 0) {
        return;
      }

      const button1 = new ButtonBuilder()
      .setCustomId("button1")
      .setLabel("İsim Verileri")
      .setStyle(ButtonStyle.Secondary)
      const button2 = new ButtonBuilder()
      .setCustomId("button2")
      .setLabel(member.user.username)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true)

      const actionrow = new ActionRowBuilder()
      .addComponents([button1, button2])

      const welcomeChannel = member.guild.channels.cache.get(registerChannel)
      const CHANNEL_IDS = ['1164902629927829514', '1179309952242810951', '1179310009776078860', '1179310034484744252'];
      const sesTeyit = CHANNEL_IDS[Math.floor(Math.random() * CHANNEL_IDS.length)];

      const content = `# Sunucumuza hoşgeldin ${member}!\nHesabının açılış tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}:f> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)\n\n<#${sesTeyit}> kanalına giriş yaparak sunucumuza hızlıca kayıt olabilirsin!`
      const msg = await welcomeChannel.send({ content: content, components: [actionrow]})
      if(unregisterRole.length > 0)member.roles.set(unregisterRole);
member.setNickname("İsim | Yaş");
      
const collector = welcomeChannel.createMessageComponentCollector({time: 60000});
collector.on("collect", async (i, reaction) => {
  let setupSystem3 = await userData.findOne({ guildID: member.guild.id, userID: member.id })
    if (i.isButton()) {
        if (i.customId === "button1") {
            if (!staffRole.some(beş => i.member.roles.cache.get(beş)) && !i.member.permissions.has(PermissionFlagsBits.Administrator) && (i.user.id != member.id)) {
                return await i.reply({content: "Bu butonları sadece ilgili kişiler kullanabilir.", ephemeral: true});
            }
            if (!setupSystem3 || !setupSystem3.Username.length) {
              i.reply({ content: `${member} kullanıcısına ait herhangi bir veri bulunamadı.`, ephemeral: true })
              return;
            }
            const numNames = setupSystem3.Username.length;
        
            let description = '```ansi\n';
            
            for (let i = 0; i < numNames; i++) {
              description += `\n[2;30m[2;37m[1;37m${i + 1}.[0m[2;37m [0m[2;30m[0m[2;30m${setupSystem3.Sex[i]}[0m [2;34m${setupSystem3.NameAndAge[i]}[0m [2;37m[1;37m-[0m[2;37m[0m [2;36m@${setupSystem3.Staff[i]} [2;37m[1;37m- [0m[2;37m[0m[2;36m[0m[2;40m[2;37m${new Date(setupSystem3.Date[i]).toLocaleString('tr-TR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}[0m[2;40m[0m\n`;
            }
            
            description += '\n```';
            
            const embed = new EmbedBuilder().setDescription(description).setAuthor({ name: `@${member.user.username} kullanıcısına ait isim istatistikleri:`, iconURL: member.guild.iconURL()}).setThumbnail(member.guild.iconURL()).setColor("2b2d31");
            i.reply({ embeds: [embed], ephemeral:true });
        }
    }
});
collector.on('end', (collected, reason) => {
    button1.setDisabled(true);
    msg.edit({ components: [actionrow] })
      });
      
  }
}