const chalk = require("chalk");
const mongo = require("../../db/mongo");
const azkarEmbedsSchema = require("../../db/schema/azkarEmbeds");

module.exports = {
  name: "set-azkar-embed",
  cooldown: 5,
  aliases: ["set-embed"],

  run: async function(client, message) {
    const connectToMongoDB = async () => {
      await mongo().then(async mongosse => {
        try {
          let data;
          data = await azkarEmbedsSchema.findOne({
            guildID: message.guild.id
          });
          if (data) {
          } else {
            const newData = {
              guildID: message.guild.id,
              status: "off"
            };
            await new azkarEmbedsSchema(newData).save();
          }
          setTimeout(async function() {
            try {
              var status = data.toJSON().status;
              if (status == "off") {
                await azkarEmbedsSchema.updateOne(
                  {
                    status: data.toJSON().status
                  },
                  {
                    status: "on"
                  }
                );
                message.channel.send(
                  "**:white_check_mark: | تم تغير وضع نشر الأزكار من رساءل عاديه ل رساءل ايمبد**"
                );
              }
              if (status == "on") {
                await azkarEmbedsSchema.updateOne(
                  {
                    status: data.toJSON().status
                  },
                  {
                    status: "off"
                  }
                );
                message.channel.send(
                  "**:white_check_mark: | تم تغير وضع نشر الأزكار من رساءل ايمبد ل رساءل عاديه**"
                );
              }
            } catch (err) {}
          }, 500);
        } finally {
          mongosse.connection.close();
        }
      });
    };
    connectToMongoDB();
  }
};
