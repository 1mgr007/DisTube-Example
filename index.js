// Module Imports
const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("./config.json");
const DisTube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");

const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: 32767
});

const distube = new DisTube.DisTube(client, {
	searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: false,
	leaveOnStop: false,
	plugins: [new SpotifyPlugin({ 
        parallel: true, 
        emitEventsAfterFetching: false,
        api: { 
            clientId: config.clientId, 
            clientSecret: config.clientSecret, 
        }
    })],
    youtubeCookie: config.youtubeCookie,
    youtubeIdentityToken: config.youtubeIdentityToken,
    ytdlOptions: {
        highWaterMark: 1 << 24,
        quality: 'highestaudio'
    },
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false
});

client.distube = distube;

client.prefix = config.Prefix;
client.owner = config.OwnerId;
client.color = config.Color;
client.musicimg = config.MusicImg;

client.logger = require('./Utils/logger');

// Utils Handling
client.logger.log(`Loading Handling Utils`, "handling");
readdirSync(`./Utils/`).filter(path => path.split(".")[0] !== "logger").forEach(file => {
	let Name = file.split(".")[0];
    let Req = require(`./Utils/${file}`);
    client.logger.log(`Loading Utils ${Name}`, "util");
	client[Name] = Req;
});

// Handling
readdirSync(`./Handling/`).forEach(file => {
    let Name = file.split(".")[0];
    client.logger.log(`Loading Handling ${Name}`, "handling");
    require(`./Handling/${file}`)(client);
});

// Error Handler
client.on('error', error => console.log(error));
client.on('warn', info => console.log(info));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.login(config.Token);