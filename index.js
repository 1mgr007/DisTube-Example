// Module Imports
const { Client, Partials, IntentsBitField } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("./config.json");
const DisTube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: [ Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember ],
    intents: new IntentsBitField(131071),
    shards: 'auto'
});

let plugins;
if (config.clientId && config.clientSecret) {
    plugins = [
        new SpotifyPlugin({ 
            parallel: true, 
            emitEventsAfterFetching: true,
            api: { clientId: config.clientId, clientSecret: config.clientSecret }
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin({ update: true })
    ]
} else {
    plugins = [
        new SoundCloudPlugin(),
        new YtDlpPlugin({ update: true })
    ]
}

let youtubeCookie;
if (config.youtubeCookie) {
    youtubeCookie = config.youtubeCookie;
} else {
    youtubeCookie = 'none';
}

let musicimg = "https://cdn.jsdelivr.net/gh/skick1234/MaBu-CDN@4.8.4/DisTube/img/banner.png";
if (config.MusicImg) {
    client.musicimg = config.MusicImg;
} else {
    client.musicimg = musicimg;
}

const distube = new DisTube.DisTube(client, {
	searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 25,
	leaveOnFinish: false,
	leaveOnStop: false,
	nsfw: true,
    savePreviousSongs: true,
	plugins: plugins,
    youtubeCookie: youtubeCookie,
    ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
    },
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false,
    emitNewSongOnly: true,
    joinNewVoiceChannel: true,
    streamType: 0,
    directLink: true
});

client.distube = distube;
client.prefix = config.Prefix;
client.owner = config.OwnerId;
client.color = config.Color;

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

client.login(process.env.Token);