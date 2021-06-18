const mongoose = require("mongoose");
const mongo = require("../mongo");

const azkarChannelsSchema = mongoose.Schema({
  guildID: String,
  channel: String
});

module.exports = mongoose.model("azkarChannels", azkarChannelsSchema);
