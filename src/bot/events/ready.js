const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");
const mongo = require("../../db/mongo");
const ytdl = require("ytdl-core");
const azkarChannelsSchema = require("../../db/schema/azkarChannels");
const azkarEmbedsSchema = require("../../db/schema/azkarEmbeds");
const azkar = require("../../db/list/azkar");
const azkarToggleSchema = require("../../db/schema/azkarToggle");
const azkarVoicesSchema = require("../../db/schema/azkarVoices");
const quranToggleSchema = require("../../db/schema/quranToggle");
const azkarTimesSchema = require("../../db/schema/azkarTimes");
const ms = require("ms");
let time;

module.exports = async function(client) {
  await client.user.setStatus("idle");
  await client.user.setActivity("$help ~ قرآن", { type: 'LISTENING' })
  console.log(
    chalk.red.bold(client.user.username) + chalk.blue.bold(" is online")
  );
  // text
  setInterval(() => {
    client.guilds.cache.forEach(async function(guild) {
      try {
        const connectToMongoDB = async () => {
          await mongo().then(async mongosse => {
            // let timer = await azkarTimesSchema.findOne({
            //   guildID: guild.id
            // });
            // if (timer == null) {
            //   const newData = {
            //     guildID: guild.id,
            //     time: ms("1s")
            //   };
            //   await new azkarTimesSchema(newData).save();
            // }
            // time = timer.toJSON().time;
            let data;
            data = await azkarChannelsSchema.findOne({
              guildID: guild.id
            });
            if (data) {
              var channel = client.channels.cache.get(data.toJSON().channel);
              if (channel) {
                var result = azkar[Math.floor(Math.random() * azkar.length)];
                let data2;
                data2 = await azkarEmbedsSchema.findOne({
                  guildID: guild.id
                });
                var toggleData = await azkarToggleSchema.findOne({
                  guildID: guild.id
                });
                if (toggleData == null) {
                  const newData = {
                    guildID: guild.id,
                    status: "on"
                  };
                  await new azkarToggleSchema(newData).save();
                }
                if (data2 == null) {
                  const newData = {
                    guildID: guild.id,
                    status: "off"
                  };
                  await new azkarEmbedsSchema(newData).save();
                }
                var toggle = toggleData.toJSON().status;
                if (toggle == "off") return;
                var status = data2.toJSON().status;
                if (status == "on") {
                  return channel.send(
                    new MessageEmbed()
                      .setAuthor(
                        "أذكار",
                        "https://athkarapp.com/images/athkarLogo.png"
                      )
                      .setColor(0x2f3136)
                      .setFooter(
                        client.user.username,
                        client.user.avatarURL({ dynaimc: true })
                      )
                      .setDescription(result)
                  );
                } else if (status == "off") {
                  return channel.send(result);
                } else return channel.send(result);
              }
            }
          });
        };
        connectToMongoDB();
      } catch (err) {
        return console.log(err);
      }
    });
  }, 1000 * 60 * 8);
  // voice
  setInterval(async function() {
    client.guilds.cache.forEach(async function(guild) {
      const connectToMongoDB = async () => {
        try {
          await mongo().then(async mongosse => {
            let data = await azkarVoicesSchema.findOne({
              guildID: guild.id
            });
            let channelID = data.toJSON().channel;
            let channel = await client.channels.cache.get(channelID);
            try {
              var toggleData = await quranToggleSchema.findOne({
                guildID: guild.id
              });
              if (toggleData == null) {
                toggleData = "on";
              }
              var toggle = toggleData.toJSON().status;
              if (toggle == "off") return await guild.me.voice.channel.leave();
              let connection = await channel.join();
              connection.play(
                ytdl("https://www.youtube.com/watch?v=IvsBHohJvNY")
              );
            } catch (err) {
              console.log(err);
            }
          });
        } catch (err) {}
      };
      connectToMongoDB();
    });
  }, 1000 * 50);
};
