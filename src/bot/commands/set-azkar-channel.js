const chalk = require("chalk");
const mongo = require("../../db/mongo");
const azkarChannelsSchema = require("../../db/schema/azkarChannels");
const azkarTimesSchema = require("../../db/schema/azkarTimes");
const ms = require("ms");

module.exports = {
  name: "set-room",
  cooldown: 5,
  aliases: ["set-channel", "set-azkar", "set-azkar-channel"],

  run: async function(client, message) {
    var args = message.content.split(" ");
    var channel =
      message.mentions.channels.first() ||
      client.channels.cache.get(args[1]) ||
      message.guild.channels.cache.find(c => c.name == args[1]) ||
      message.channel;
    if (channel) {
      const connectToMongoDB = async () => {
        await mongo().then(async mongosse => {
          try {
            let data;
            data = await azkarChannelsSchema.findOne({
              guildID: message.guild.id
            });
            if (data) {
              await azkarChannelsSchema.updateOne(
                {
                  channel: data.toJSON().channel
                },
                {
                  channel: channel.id
                }
              );
            } else {
              const newData2 = {
                guildID: message.guild.id,
                time: ms("1s")
              };
              await new azkarTimesSchema(newData2).save();
              const newData = {
                guildID: message.guild.id,
                channel: channel.id
              };
              await new azkarChannelsSchema(newData).save();
            }
          } finally {
            mongosse.connection.close();
          }
        });
      };
      connectToMongoDB();
      message.channel.send(
        "**:white_check_mark: | تم نقل روم نشر الأزكار ل `" +
          channel.name +
          "`**"
      );
    }
  }
};
