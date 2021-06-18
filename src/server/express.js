const express = require("express");
const app = new express();
const chalk = require("chalk");
const PORT = process.env.PORT || 3000;

app.get("/", async function(req, res) {
  await res.sendFile(__dirname + '/pages/home.html');
});

app.get("/commands", async function(req, res) {
  await res.sendFile(__dirname + '/pages/commands.html');
});

app.listen(PORT, async function() {
  console.log(chalk.red.bold("Express server is online"));
});
