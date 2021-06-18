const chalk = require("chalk");
const mongo = require("../../db/mongo");
const azkarTimesSchema = require("../../db/schema/azkarTimes");
const ms = require("ms");

module.exports = {
  name: "set-azkar-time",
  cooldown: 5,
  aliases: ["set-time", "set-timer"],

  run: async function(client, message) {
    var args = message.content.split(" ");
    if (args[1]) {
      const connectToMongoDB = async () => {
        await mongo().then(async mongosse => {
          try {
            let data;
            data = await azkarTimesSchema.findOne({
              guildID: message.guild.id
            });
            if (data) {
              await azkarTimesSchema.updateOne(
                {
                  time: data.toJSON().time
                },
                {
                  time: ms(args[1])
                }
              );
            } else {
              const newData = {
                guildID: message.guild.id,
                time: ms(args[1])
              };
              await new azkarTimesSchema(newData).save();
            }
          } finally {
            mongosse.connection.close();
          }
        });
      };
      connectToMongoDB();
      message.channel.send(
        "**:white_check_mark: | تم تغير وقت نشر الأذكار لـ `" +
          args[1] +
          "`**"
      );
    } else if (!args[1]) {
      
    }
  }
};
