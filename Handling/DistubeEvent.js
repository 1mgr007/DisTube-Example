const { readdirSync } = require('fs');
const DisTube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const config = require(`${process.cwd()}/config.json`);

module.exports = async (client) => {

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

    readdirSync(`${process.cwd()}/Events/Distube/`).forEach(file => {
        const event = require(`${process.cwd()}/Events/Distube/${file}`);
        let eventName = file.split(".")[0];
        client.logger.log(`Loading Distube Events ${eventName}`, "distube");
        client.distube.on(eventName, event.bind(null, client));
    });
}