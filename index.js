// Module Imports
const { Client, Partials, IntentsBitField, Options } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("./config.json");
const DisTube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ],
    intents: new IntentsBitField(131071),
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: 'auto',
    makeCache: Options.cacheEverything()
});

const distube = new DisTube.DisTube(client, {
	searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 25,
	leaveOnFinish: false,
	leaveOnStop: false,
	nsfw: true,
	plugins: [
        new SpotifyPlugin({ 
            parallel: true, 
            emitEventsAfterFetching: true,
            api: { clientId: config.clientId, clientSecret: config.clientSecret }
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin({ update: true })
    ],
    youtubeCookie: config.youtubeCookie,
    ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
    },
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false,
    emitNewSongOnly: true
});

client.distube = distube;
client.prefix = config.Prefix;
client.owner = config.OwnerId;
client.color = config.Color;

const musicimg = "https://cdn.jsdelivr.net/gh/skick1234/MaBu-CDN@4.8.4/DisTube/img/banner.png";
if (!config.MusicImg) client.musicimg = musicimg;
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