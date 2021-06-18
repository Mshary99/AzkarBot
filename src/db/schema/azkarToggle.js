const mongoose = require("mongoose");
const mongo = require("../mongo");

const azkarToggleSchema = mongoose.Schema({
  guildID: String,
  status: String
});

module.exports = mongoose.model("azkarToggle", azkarToggleSchema);
