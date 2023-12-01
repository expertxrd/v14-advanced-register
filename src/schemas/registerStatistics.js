const { Schema, model, models } = require('mongoose')

const data = new Schema({

  guildID: { type: String, default: "" },

  userID: { type: String, default: "" },


  manStats: { type: Number, default: 0 },
  womanStats: { type: Number, default: 0 },
  totalStats: { type: Number, default: 0 },
  lastUser: { type: String, default: "1145807221003919370" },
  lastUserNameAndAge: { type: String, default: "Undefined" },
  lastUserDate: { type: Number, default: 0 }
})

module.exports = models.registerStatistics || model("registerStatistics", data);
