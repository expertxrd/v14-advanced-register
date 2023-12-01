const { Schema, model } = require("mongoose");

const setupSystem = new Schema({

  guildID: { type: String, default: "" },

  ManRoles: { type: Array, default: [] }, 
  WomanRoles: { type: Array, default: [] },
  UnregisterRoles: { type: Array, default: [] }, 
  AuthorizedRoles: { type: Array, default: [] },
  welcomeChannel: { type: String, default: "" }, 
  logChannel: { type: String, default: "" },
  tagliAlim: { type: Boolean, default: false }
});

module.exports = model("setupSystem", setupSystem);
