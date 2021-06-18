require('dotenv').config()

module.exports = {
    token: process.env.TOKEN,
    mongoPath: process.env.mongoPath,
    prefix: "$",
    expressURL: "" // if you have a express server but it here to uptime you project
};