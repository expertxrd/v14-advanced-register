const Discord = require('discord.js')
const Config = require("../../config.json")
module.exports = {
    name: 'messageCreate',
    execute(message, client) {

      const Prefix = Config.Client.botPrefix
      if(message.author.bot) return
      if(!message.content.startsWith(Prefix)) return
      let command = message.content.split(" ")[0].slice(Prefix.length)
      let args = message.content.split(" ").slice(1)
      let cmd = client.commands.get(command)
      if(!cmd) return

        cmd.execute(client, message, args)

    }
}