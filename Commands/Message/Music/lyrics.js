const { EmbedBuilder, Util } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    category: "Music",
    aliases: [ "ly" ],
    description: "Show Lyric a song",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SendMessages" ],
    owner: false,
    async execute(client, message, args) {
        const queue = message.client.distube.getQueue(message);

        let song = args.join(" ");
		let currentSong = queue.songs[0];

        if (!song && currentSong) song = currentSong.name;

        if (!song && !currentSong) return message.reply(`${message.client.emoji.error} | Please enter the title of the song!`);

        try {
            let lyrics = await lyricsFinder(song, "");
            if (!lyrics) return message.reply(`${message.client.emoji.error} | No lyrics found!`);

            let split = await Util.splitMessage(lyrics, { maxLength: 2048 });

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Lyrics` })
                .setColor(message.client.color)
                .setTitle(`${song}`)
                .setDescription(split.join(""))
                .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return message.channel.send("${message.client.emoji.error} | An error occurred while searching for song lyrics."); 
        }
    }
}