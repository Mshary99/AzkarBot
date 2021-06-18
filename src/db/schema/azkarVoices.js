const mongoose = require("mongoose");
const mongo = require("../mongo");

const azkarVoicesSchema = mongoose.Schema({
  guildID: String,
  channel: String
});

module.exports = mongoose.model("azkarVoices", azkarVoicesSchema);