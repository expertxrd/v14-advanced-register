const{ Client, Partials } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const Config = require("./config.json")
require("./src/handlers/commandHandler.js")(client)
client.login(Config.Client.botToken)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
