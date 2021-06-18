const { MessageEmbed } = require("discord.js");
const azkarE = require("../../db/list/eveningAzkar");

module.exports = {
  name: "evening",
  cooldown: 6,
  aliases: ["azkar-evening", "اذكار المساء", "المساء"],
  run: async (client, message) => {
    var result = azkarE[Math.floor(Math.random() * azkarE.length)];
    message.channel.send(
      new MessageEmbed()
        .setThumbnail(
          "https://athkarapp.com/images/athkarLogo.png"
        )
        .setAuthor(
          "أذكار المساء",
          "https://athkarapp.com/images/athkarLogo.png"
        )
        .setTitle("**المصدر**")
        .setURL("https://www.islambook.com/azkar/2/%D8%A3%D8%B0%D9%83%D8%A7%D8%B1-%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A1")
        .setColor(0x2f3136)
        .setDescription("**" + result + "**")
        .setFooter(
          client.user.username,
          client.user.avatarURL({ dynaimc: true })
        )
    );
  }
};
