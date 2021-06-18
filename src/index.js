require("./server/express");
const { Client, Collection } = require("discord.js");
const client = new Client();
const chalk = require("chalk");
const fs = require("fs");
const mongo = require("./db/mongo");

client.commands = new Collection();

const connectToMongoDB = async() => {
    await mongo().then(async mongosse => {
        try {
            console.log(chalk.green.bold("Connected to mongoDB!"));
        } finally {
            mongosse.connection.close();
        }
    });
};

connectToMongoDB();

fs.readdir(__dirname + "/bot/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir(__dirname + "/bot/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/bot/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading command ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(commandName, props);
    });
});

client.login(require("./config/bot").token).catch(err => console.log(chalk.red.bold(err)))