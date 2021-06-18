const mongoose = require("mongoose");
const mongo = require("../mongo");

const botPrefixSchema = mongoose.Schema({
  guildID: String,
  prefix: String
});

module.exports = mongoose.model("botPrefix", botPrefixSchema);
