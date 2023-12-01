const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, Collection, ContextMenuCommandBuilder } = require ("discord.js")
const Config = require("../../config.json")
const setupSystem = require("../schemas/setupSystem.js")

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
      const systemData = await setupSystem.findOne({ guildID: member.guild.id })
      const registerChannel = systemData.welcomeChannel
      const unregisterRole = systemData.UnregisterRoles || []
      const staffRole = systemData.AuthorizedRoles || []

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
      await welcomeChannel.send({ content: content, components: [actionrow]})
      if(unregisterRole.length > 0)member.roles.set(unregisterRole);
member.setNickname("İsim | Yaş");
      
      
  }
}