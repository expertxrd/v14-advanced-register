const { ActivityType } = require("discord.js")
const { connect } = require("mongoose")
const Config = require("../../config.json")
require('advanced-logs')

module.exports = {
  name: 'ready',
  execute (client) {
    console.success(``, `[CLIENT] Succesfully connected to Discord API.`)
    client.user.setActivity({
          name: `Exsta`, 
          type: ActivityType.Custom,
          state: `Özel bot yaptırmak için iletişim: exsta7x`,
    })
    connect(Config.Database.mongooseURL).then(() => {
      console.success(` `, `[DATABASE] Succesfully connected to Mongoose API.`)
  });
  }
}