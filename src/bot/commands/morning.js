const { MessageEmbed } = require("discord.js");
const azkarM = require("../../db/list/morningAzkar");

module.exports = {
  name: "morning",
  cooldown: 6,
  aliases: ["azkar-morning", "اذكار الصباح", "الصباح"],
  run: async (client, message) => {
    var result = azkarM[Math.floor(Math.random() * azkarM.length)];
    message.channel.send(
      new MessageEmbed()
        .setThumbnail("https://athkarapp.com/images/athkarLogo.png")
        .setAuthor(
          "أذكار الصباح",
          "https://athkarapp.com/images/athkarLogo.png"
        )
        .setTitle("**المصدر**")
        .setURL(
          "https://www.islambook.com/azkar/1/%D8%A3%D8%B0%D9%83%D8%A7%D8%B1-%D8%A7%D9%84%D8%B5%D8%A8%D8%A7%D8%AD"
        )
        .setColor(0x2f3136)
        .setDescription("**" + result + "**")
        .setFooter(
          client.user.username,
          client.user.avatarURL({ dynaimc: true })
        )
    );
  }
};
