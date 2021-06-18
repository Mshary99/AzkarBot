const { MessageEmbed } = require("discord.js");
const quickdb = require("quick.db");

module.exports = {
  name: "help",
  cooldown: 7,
  aliases: ["مساعده"],
  run: async (client, message) => {
    var prefix = quickdb.fetch(`Prefix_${message.guild.id}`);
    if (prefix == null)
      quickdb.set(
        `Prefix_${message.guild.id}`,
        require("../../config/bot").prefix
      );
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "قائمة المساعده 🕌",
          "https://athkarapp.com/images/athkarLogo.png"
        )
        .setThumbnail(client.user.avatarURL({ dynaimc: true }))
        .setColor(0x2f3136)
        .setFooter(
          client.user.username,
          client.user.avatarURL({ dynaimc: true })
        ).setDescription(`
**أوامر عامه**
> 🕌 \`${prefix}help\` **للحصول على قاءمة السماعده**
> 🕌 \`${prefix}ping\` **للحصول على نتيجه ببينج البوت**

**أوامر الأذكار**
> 🕌 \`${prefix}set-azkar-channel\` **لتحديد روم نشر الأذكار**
> 🕌 \`${prefix}set-azkar-embed\` **للتغير ما بين نظام نشر الأذكار من رساءل عاديه ل رساءل ايمبد**
> 🕌 \`${prefix}set-azkar-toggle\` **لايقاف و تشغيل نظام أرسال الأذكار**
> 🕌 \`${prefix}morning\` **للحصول على اذكار الصباح**
> 🕌 \`${prefix}evening\` **للحصول على اذكار المساء**
> 🕌 \`${prefix}mos7f\` **للحصول على صفحات المصحف الكريم**

**أوامر القرءان**
> 🕌 \`${prefix}set-quran-channel\` **لتحديد روم اذاعة القرءان الكريم**
> 🕌 \`${prefix}set-quran-toggle\` **لاقاف و تشغيل نظام أذاعة القرءان الكريم**
> 🕌 \`${prefix}quran\` **لتشغيل صور معينه في القرءان الكريم**

**برفكس السيرفر**: \`${prefix}\`

**روابط تابعة للبوت:**
**[سيرفر الدعم الفني](https://www.youtube.com/watch?v=BThsyooJOj4) \`|\` [الموقع الخاص بالبوت](https://www.youtube.com/watch?v=BThsyooJOj4) \`|\` [التصويت للبوت](https://www.youtube.com/watch?v=BThsyooJOj4) \`|\` [اضافة البوت](https://www.youtube.com/watch?v=BThsyooJOj4)**`)
      // .addFields(
      //   { name: `> ${prefix}help`, value: "**`للحصول على قاءمة السماعده`**", inline: false },
      //   { name: `> ${prefix}support`, value: "**`للحصول على روابط مساعدة البوت`**", inline: false },
      //   { name: `> ${prefix}ping`, value: "**`للحصول على نتيجه ببينج البوت`**", inline: false },
      //   { name: `_ _`, value: "_ _", inline: false },
      //   { name: `> ${prefix}set-azkar-channel`, value: "**`لتحديد روم نشر الأذكار`**", inline: false },
      //   { name: `> ${prefix}set-azkar-embed`, value: "**`للتغير ما بين نظام نشر الأذكار من رساءل عاديه ل رساءل ايمبد`**", inline: false },
      //   { name: `> ${prefix}set-azkar-toggle`, value: "**`لايقاف و تشغيل نظام أرسال الأذكار`**", inline: false },
      //   { name: `> ${prefix}morning`, value: "**`للحصول على اذكار الصباح`**", inline: false },
      //   { name: `> ${prefix}evening`, value: "**`للحصول على اذكار المساء`**", inline: false },
      //   { name: `> ${prefix}mos7f`, value: "**`للحصول على صفحات المصحف الكريم`**", inline: false },
      //   { name: `_ _`, value: "_ _", inline: false },
      //   { name: `> ${prefix}set-quran-channel`, value: "**`لتحديد روم اذاعة القرءان الكريم`**", inline: false },
      //   { name: `> ${prefix}set-quran-toggle`, value: "**`لاقاف و تشغيل نظام أذاعة القرءان الكريم`**", inline: false },
      //   { name: `> ${prefix}quran`, value: "**`لتشغيل صور معينه في القرءان الكريم`**", inline: false },
      // )
    );
  }
};
