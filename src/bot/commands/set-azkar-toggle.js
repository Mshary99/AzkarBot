const chalk = require("chalk");
const mongo = require("../../db/mongo");
const azkarToggleSchema = require("../../db/schema/azkarToggle");

module.exports = {
  name: "set-azkar-toggle",
  cooldown: 5,
  aliases: [],

  run: async function(client, message) {
    const connectToMongoDB = async () => {
      await mongo().then(async mongosse => {
        try {
          let data;
          data = await azkarToggleSchema.findOne({
            guildID: message.guild.id
          });
          if (!data || data == null) {
            const newData = {
              guildID: message.guild.id,
              status: "on"
            };
            await new azkarToggleSchema(newData).save();
          }
          setTimeout(async function() {
            var status = data.toJSON().status;
            if (status == "off") {
              await azkarToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "on"
                }
              );
              message.channel.send(
                "**:white_check_mark: | تم تفعيل ارسال الأزكار**"
              );
            }
            if (status == "on") {
              await azkarToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "off"
                }
              );
              message.channel.send(
                "**:white_check_mark: | تم ايقاف ارسال الأزكار**"
              );
            }
          }, 500);
        } finally {
          mongosse.connection.close();
        }
      });
    };
    connectToMongoDB();
  }
};
