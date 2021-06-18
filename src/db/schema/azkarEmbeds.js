const mongoose = require("mongoose");
const mongo = require("../mongo");

const azkarEmbedsSchema = mongoose.Schema({
  guildID: String,
  status: String
});

module.exports = mongoose.model("azkarEmbeds", azkarEmbedsSchema);
