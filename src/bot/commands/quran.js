const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
  name: "quran",
  cooldown: 7,
  aliases: ["شغل", "play"],
  run: async (client, message) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        "**:x: | عليك أن تكون في قناه صوتيه لأستخدام هذا الأمر**"
      );
    message.channel
      .send(
        new MessageEmbed()
          .setThumbnail(
            "https://e7.pngegg.com/pngimages/314/453/png-clipart-online-quran-project-the-holy-qur-an-text-translation-and-commentary-islam-arabic-calligraphy-attend-class-class-begins-emblem-logo-thumbnail.png"
          )
          .setAuthor(
            "مشغل القرءان",
            "https://e7.pngegg.com/pngimages/314/453/png-clipart-online-quran-project-the-holy-qur-an-text-translation-and-commentary-islam-arabic-calligraphy-attend-class-class-begins-emblem-logo-thumbnail.png"
          )
          .setColor(0x2f3136)
          .setDescription(
            `**[1] => \`سورة الفاتحة\`
          [2] => \`سورة البقرة\`
          [3] => \`سورة آل عمران\`
          [4] => \`سورة النساء\`
          [5] => \`سورة المائدة\`
          [6] => \`سورة الأنعام\`
          [7] => \`سورة الأعراف\`
          [8] => \`سورة الأنفال\`
          [9] => \`سورة التوبه\`
          [10] => \`صورة يونس\`**`
          )
      )
      .then(async m => {
        const filter = user => user.author.id == message.author.id;
        m.channel
          .awaitMessages(filter, { max: 1, time: 60 * 1000 })
          .then(async msg => {
            msg = msg.first();
            if (msg.content === "1") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=btUPp-VJGos")
              );
              message.react("✅");
            } else if (msg.content === "2") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=t1dFbQiIyAs")
              );
              message.react("✅");
            } else if (msg.content === "3") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=mGxn3WO5bqg")
              );
              message.react("✅");
            } else if (msg.content === "4") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=Brmt10819jQ")
              );
              message.react("✅");
            } else if (msg.content === "5") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=gvn689ZgSFU")
              );
              message.react("✅");
            } else if (msg.content === "6") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=4K6vuPv4xsU")
              );
              message.react("✅");
            } else if (msg.content === "7") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=IZZ95aLBD60")
              );
              message.react("✅");
            } else if (msg.content === "8") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=J05pdPT-Zo4")
              );
              message.react("✅");
            } else if (msg.content === "9") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=uhCRmGtNlog")
              );
              message.react("✅");
            } else if (msg.content === "10") {
              let connection = await message.member.voice.channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=BThsyooJOj4")
              );
              message.react("✅");
            } else {
              message.channel.send("**:x: | هذا الأختيار خاطأ**");
            }
          });
      });
  }
};
