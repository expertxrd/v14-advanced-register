const { Schema, model } = require("mongoose");

const userStatistics = new Schema({

  guildID: { type: String, default: "" },

  userID: { type: String, default: "" },

  Username: { type: Array, default: [] },

  NameAndAge: { type: Array, default: [] },

  Staff: { type: Array, default: [] },

  Date: { type: Array, default: [] },

  Sex: { type: Array, default: [] }
  
});

module.exports = model("userStatistics", userStatistics);
