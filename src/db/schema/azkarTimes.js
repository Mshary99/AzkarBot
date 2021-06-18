const mongoose = require("mongoose");
const mongo = require("../mongo");

const azkarTimesSchema = mongoose.Schema({
  guildID: String,
  time: String
});

module.exports = mongoose.model("azkarTimes", azkarTimesSchema);
