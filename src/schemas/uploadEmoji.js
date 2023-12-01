const { Schema, model } = require("mongoose");

const EmojiUpload = new Schema({

  guildID: { type: String, default: "" },
  emojis: { type: Boolean, default: false }
});

module.exports = model("emojiUploads", EmojiUpload);
