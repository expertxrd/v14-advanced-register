const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, BaseSelectMenuBuilder } = require ("discord.js")
const Config = require("../../config.json")
const setupSystem = require("../schemas/setupSystem.js")
const emoteee = require("../schemas/uploadEmoji.js")

module.exports = {
  slash: false,
  name: ["setup"],
  
async execute(client, message, args) { 
  
  let setupSystem1 = setupSystem.findOne({ guildID: message.guild.id })
  let setupSystem2 = await setupSystem.findOne({ guildID: message.guild.id })
  let setupSystem52 = await emoteee.findOne({ guildID: message.guild.id })
  const check = message.guild.emojis.cache.find(e => e.name === "exsta_check");
  const reject = message.guild.emojis.cache.find(e => e.name === "exsta_reject");
  const loading = message.guild.emojis.cache.find(e => e.name === "exsta_loading");

  if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { message.reply("Bu komutu kullanmak için gerekli yetkiniz bulunmamakta."); return }
    let arg = args[0];
    if(!arg){
    let embed = new EmbedBuilder()
    .setAuthor({ name: `${message.guild.name} | Setup System`, iconURL: message.guild.iconURL()})
    .setDescription(
`
\`\`\`ansi
[1;37mKurulum[0m[2;37m yapmak için aşağıdaki seçeneğe tıklayın.[0m[2;36m[0m
\`\`\`
`)
    .setThumbnail(message.guild.iconURL())
    .setColor("2b2d31")
    let menu = new StringSelectMenuBuilder()
    .setCustomId(`kategoriler`)
    .setPlaceholder(`Seçenekleri görüntülemek için tıkla!`)
    .addOptions(
        {
            label: `Rol Ayarları`,
            description: `Rol ayarlarını kurmanızı sağlar.`,
            value:`rol`
        },
        {
          label: `Kanal Ayarları`,
          description: `Kanal ayarlarını kurmanızı sağlar.`,
          value:`kanal`
        },
    )
    .setDisabled(true)
   let ayarksıım = new ActionRowBuilder().addComponents(
[menu]
   )
   const sa = await message.reply(`Emojiler yükleniyor...`)
    const emojis = [
        { name: "exsta_nicks", url: "https://cdn.discordapp.com/emojis/1171109313478131852.png" },
        { name: "exsta_man", url: "https://cdn.discordapp.com/emojis/1171111483506172005.png" },
        { name: "exsta_woman", url: "https://cdn.discordapp.com/emojis/1171111488111513650.png" },
        { name: "exsta_reject", url: "https://cdn.discordapp.com/emojis/1177891395617427508.png" },
        { name: "exsta_check", url: "https://cdn.discordapp.com/emojis/1177891407340507136.png" },
        { name: "exsta_loading", url: "https://cdn.discordapp.com/emojis/1179461005680594998.gif" },
        { name: "exsta_nine", url: "https://cdn.discordapp.com/emojis/1179799364261122179.png" },
        { name: "exsta_eight", url: "https://cdn.discordapp.com/emojis/1179799374008688690.png" },
        { name: "exsta_seven", url: "https://cdn.discordapp.com/emojis/1179799384360230963.png" },
        { name: "exsta_six", url: "https://cdn.discordapp.com/emojis/1179799393407336538.png" },
        { name: "exsta_five", url: "https://cdn.discordapp.com/emojis/1179799409505083432.png" },
        { name: "exsta_four", url: "https://cdn.discordapp.com/emojis/1179799416496992298.png" },
        { name: "exsta_three", url: "https://cdn.discordapp.com/emojis/1179799428052299827.png" },
        { name: "exsta_two", url: "https://cdn.discordapp.com/emojis/1179799436084391998.png" },
        { name: "exsta_one", url: "https://cdn.discordapp.com/emojis/1179799442421973105.png" },
        { name: "exsta_zero", url: "https://cdn.discordapp.com/emojis/1179799455885709322.png" }
    ]
    Promise.all(emojis.map(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
      
        try {
          await message.guild.emojis.create({ attachment: x.url, name: x.name });
        } catch (error) {
            return;
        }
      }))
        .then(async() => {
          menu.setDisabled(false)
          await sa.delete()
          message.channel.send({embeds: [embed], components: [ayarksıım]}).then((msg)=>{
            var filter = (component) => component.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 })
            collector.on('collect', async (interaction) => {
            if (interaction.customId == "kategoriler") {
               if (interaction.values[0] == "rol") {
                   msg.edit({
                       embeds: [new EmbedBuilder()
                          .setAuthor({ name: `${interaction.guild.name} | Role Setup System`, iconURL: interaction.guild.iconURL()})
                          .setColor("2b2d31")
                          .setThumbnail(message.guild.iconURL())
                          .setDescription(`
        **#1** **[Erkek Rol(leri)](<https://discord.gg/altyapilar>)**: ${setupSystem2?.ManRoles && setupSystem2.ManRoles.length > 0 ? `${check} ${setupSystem2.ManRoles.map(x => `<@&${x}>`).join(", ")}` : `${reject} (\`.setup 1 <@Role/ID>\`)`}
        **#2** **[Kadın Rol(leri)](<https://discord.gg/altyapilar>)**: ${setupSystem2?.WomanRoles && setupSystem2.WomanRoles.length > 0 ? `${check} ${setupSystem2.WomanRoles.map(x => `<@&${x}>`).join(", ")}` : `${reject} (\`.setup 2 <@Role/ID>\`)`}
        **#3** **[Yetkili Rol(leri)](<https://discord.gg/altyapilar>)**: ${setupSystem2?.AuthorizedRoles && setupSystem2.AuthorizedRoles.length > 0 ? `${check} ${setupSystem2.AuthorizedRoles.map(x => `<@&${x}>`).join(", ")}` : `${reject} (\`.setup 3 <@Role/ID>\`)`}
        **#4** **[Kayıtsız Rol(leri)](<https://discord.gg/altyapilar>)**: ${setupSystem2?.UnregisterRoles && setupSystem2.UnregisterRoles.length > 0 ? `${check} ${setupSystem2.UnregisterRoles.map(x => `<@&${x}>`).join(", ")}` : `${reject} (\`.setup 4 <@Role/ID>\`)`}
        `)
                          
                       ]
                   })
                   await interaction.deferUpdate()
               }
               if (interaction.values[0] == "kanal") {
                msg.edit({
                    embeds: [new EmbedBuilder()
                       .setAuthor({ name: `${interaction.guild.name} | Channel Setup System`, iconURL: interaction.guild.iconURL()})
                       .setColor("2b2d31")
                       .setThumbnail(message.guild.iconURL())
                       .setDescription(`
        **#5** **[Kayıt Kanalı](<https://discord.gg/altyapilar>)**: ${setupSystem2?.welcomeChannel && setupSystem2.welcomeChannel.length > 0 ? `${check} <#${setupSystem2?.welcomeChannel}>` : `${reject} (\`.setup 5 <#Channel/ID>\`)`}
        **#6** **[Kayıt Log Kanalı](<https://discord.gg/altyapilar>)**: ${setupSystem2?.logChannel && setupSystem2.logChannel.length > 0 ? `${check} <#${setupSystem2?.logChannel}>` : `${reject} (\`.setup 6 <#Channel/ID>\`)`}
        `)
                    ]
                })
                await interaction.deferUpdate()
            }
              }
            })
            collector.on('end', (collected, reason) => {
            menu.setDisabled(true)
            msg.edit({ components: [ayarksıım] })
              });
        })
        await message.react(check)
        })
  }
  if (["1"].some(x => arg == x)) {
    let roller;
        if (message.mentions.roles.size >= 1)
            roller = message.mentions.roles.map(role => role.id);
        else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
        if (roller.length <= 0) return
        await setupSystem1.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ManRoles: roller } }, { upsert: true }).exec();
        message.reply({ content: `**#1** numaralı **[Erkek Rol(leri)](<https://discord.gg/altyapilar>)** ayarı başarıyla ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı.` })
        
}
if (["2"].some(x => arg == x)) {
    let roller;
        if (message.mentions.roles.size >= 1)
            roller = message.mentions.roles.map(role => role.id);
        else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
        if (roller.length <= 0) return
        await setupSystem1.findOneAndUpdate({ guildID: message.guild.id }, { $set: { WomanRoles: roller } }, { upsert: true }).exec();
        message.reply({ content: `**#2** numaralı **[Kadın Rol(leri)](<https://discord.gg/altyapilar>)** ayarı başarıyla ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı.` })
        
}
if (["3"].some(x => arg == x)) {
    let roller;
        if (message.mentions.roles.size >= 1)
            roller = message.mentions.roles.map(role => role.id);
        else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
        if (roller.length <= 0) return
        await setupSystem1.findOneAndUpdate({ guildID: message.guild.id }, { $set: { AuthorizedRoles: roller } }, { upsert: true }).exec();
        message.reply({ content: `**#3** numaralı **[Yetkili Rol(leri)](<https://discord.gg/altyapilar>)** ayarı başarıyla ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı.` })
        
}
if (["4"].some(x => arg == x)) {
    let roller;
        if (message.mentions.roles.size >= 1)
            roller = message.mentions.roles.map(role => role.id);
        else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
        if (roller.length <= 0) return
        await setupSystem1.findOneAndUpdate({ guildID: message.guild.id }, { $set: { UnregisterRoles: roller } }, { upsert: true }).exec();
        message.reply({ content: `**#4** numaralı **[Kayıtsız Rol(leri)](<https://discord.gg/altyapilar>)** ayarı başarıyla ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı.` })
        
}
if (["5"].some(x => arg == x)) {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if (!channel) return
    let kanal = await setupSystem1.findOneAndUpdate({ guildID: message.guild.id }, { $set: { welcomeChannel: channel.id } }, { upsert: true })
    message.reply({ content: `**#5** numaralı **[Kayıt Kanalı](<https://discord.gg/altyapilar>)** ayarı başarıyla ${channel} olarak ayarlandı.` })
}
if (["6"].some(x => arg == x)) {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if (!channel) return
    let kanal = await setupSystem1.findOneAndUpdate({ guildID: message.guild.id }, { $set: { logChannel: channel.id } }, { upsert: true })
    message.reply({ content: `**#6** numaralı **[Kayıt Log Kanalı](<https://discord.gg/altyapilar>)** ayarı başarıyla ${channel} olarak ayarlandı.` })
}
}}