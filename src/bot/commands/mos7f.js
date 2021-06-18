const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  name: "mos7f",
  cooldown: 10,
  aliases: ["mohf", "مصحف", "قرءان", "المصحف"],

  run: async function(client, message) {
    var pages = require("../../db/list/mos7f");
    var page = 1;

    var embed = new MessageEmbed()
      .setColor("#2F3136")
      .setFooter(
        `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
        "https://media.discordapp.net/attachments/756329106953601225/820445307783086090/unnamed.webp"
      )
      .setImage(pages[page - 1]);
    message.channel.send({ embed: embed }).then(msg => {
      msg.react("⬅");
      msg.react("➡").then(() => {
        let backwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⬅" && user.id === message.author.id;
        let forwardsFilter = (reaction, user) =>
          reaction.emoji.name === "➡" && user.id === message.author.id;
        let backwards = msg.createReactionCollector(backwardsFilter, {
          time: 0
        });
        let forwards = msg.createReactionCollector(forwardsFilter, { time: 0 });
        backwards.on("collect", r => {
          if (page === 1) return;
          page--;
          embed.setImage(pages[page - 1]);
          embed.setFooter(
            `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
            "https://images-ext-2.discordapp.net/external/Fp9gUUJ_-w-JKouEOUSeDrP0mPDn4PBlOunqJiqA7Ao/https/e7.pngegg.com/pngimages/698/430/png-clipart-the-holy-qur-an-text-translation-and-commentary-tafsir-noble-quran-quran-translations-al-quran-holy-qur-an-text.png?width=427&height=427"
          );
          msg.edit({ embed: embed });
          r.users.remove(message.author.id).catch(err => console.log(err));
        });
        forwards.on("collect", r => {
          if (page === pages.length) return;
          page++;
          embed.setImage(pages[page - 1]);
          embed.setFooter(
            `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
            "https://images-ext-2.discordapp.net/external/Fp9gUUJ_-w-JKouEOUSeDrP0mPDn4PBlOunqJiqA7Ao/https/e7.pngegg.com/pngimages/698/430/png-clipart-the-holy-qur-an-text-translation-and-commentary-tafsir-noble-quran-quran-translations-al-quran-holy-qur-an-text.png?width=427&height=427"
          );
          msg.edit({ embed: embed });
          r.users.remove(message.author.id).catch(err => console.log(err));
        });
      });
    });
  }
};
