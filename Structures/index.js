// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 14223, partials: ['CHANNEL'] });

const { promisify } = require('util');
const Ascii = require('ascii-table');
const { glob } = require('glob');
const PG = promisify(glob);
const chalk = require('chalk');

client.commands = new Collection();

// ========================================================
//* Console Logging With Chalk Colors
log = {
    info: function(message) {
        console.log(
            chalk.white(`[${new Date().toLocaleString()}]`),
            chalk.blue(message),
        );
    },
    log: function(message) {
        console.log(
            chalk.white(`[${new Date().toLocaleString()}]`),
            chalk.green(message),
        );
    },
    warn: function(message) {
        console.log(
            chalk.white(`[${new Date().toLocaleString()}]`),
            chalk.yellow(message),
        );
    },
    error: function(message) {
        console.log(
            chalk.white(`[${new Date().toLocaleString()}]`),
            chalk.red(message),
        );
    },
};
log.info('EnlX > Loading EnlX...');
// ========================================================
//* Cooldown system
client.cooldown = new Collection();
// ========================================================
//* Maintenance check
client.maintenance = false;
// ========================================================
//* Music System
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()],
});
module.exports = client;
// ========================================================
//* Giveaway System
require('../Systems/GiveawaySys')(client);
// ========================================================
//* Events and Commands Handler
['Events', 'Commands'].forEach((handler) => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});
// ========================================================

client.login(process.env.TOKEN);
