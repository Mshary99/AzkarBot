const mongoose = require("mongoose");
const mongo = require("../mongo");

const quranToggleSchema = mongoose.Schema({
  guildID: String,
  status: String
});

module.exports = mongoose.model("quranToggle", quranToggleSchema);
