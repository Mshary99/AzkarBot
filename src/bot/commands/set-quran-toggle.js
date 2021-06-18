const chalk = require("chalk");
const mongo = require("../../db/mongo");
const quranToggleSchema = require("../../db/schema/quranToggle");

module.exports = {
  name: "set-quran-toggle",
  cooldown: 5,
  aliases: [],

  run: async function(client, message) {
    const connectToMongoDB = async () => {
      await mongo().then(async mongosse => {
        try {
          let data;
          data = await quranToggleSchema.findOne({
            guildID: message.guild.id
          });
          if (!data || data == null) {
            const newData = {
              guildID: message.guild.id,
              status: "on"
            };
            await new quranToggleSchema(newData).save();
          }
          try {
          setTimeout(async function() {
            var status = data.toJSON().status;
            if (status == "off") {
              await quranToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "on"
                }
              );
              message.channel.send(
                "**:white_check_mark: | تم تفعيل ازاعة القرءان الكريم**"
              );
            }
            if (status == "on") {
              await quranToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "off"
                }
              );
              message.channel.send(
                "**:white_check_mark: | تم ايقاف ازاعة القرءان الكريم**"
              );
            }
          }, 500);
          } catch (err) {
            message.channel.send("**:x: | يرجى المحاوله مره اخرى بعد ثوان**")
          }
        } finally {
          mongosse.connection.close();
        }
      });
    };
    connectToMongoDB();
  }
};
