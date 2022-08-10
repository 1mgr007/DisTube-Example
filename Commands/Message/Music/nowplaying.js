/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: [ "np" ],
    description: "Show playing song",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SendMessages" ],
    owner: false,
    async execute(client, message, args) {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.reply(`${message.client.emoji.error} | There is no music playing!`);

        const currentSong = queue.songs[0];

        // Progress Bar
        var total = currentSong.duration * 1000;
        var current = queue.currentTime * 1000;
        var size = 30;
        var line = '─';
        var slider = message.client.emoji.note;

        let embed = new EmbedBuilder()
            .setTitle(`${message.client.emoji.music} Now Playing`)
            .setDescription(`[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
            .setThumbnail(currentSong.thumbnail)
            .setColor(message.client.color)
			.addFields(
				{ name: "\u200b", value: message.client.progressbar.progressbar(total, current, size, line, slider) },
				{ name: "\u200b", value: `\`${message.client.convert.convertTime(current)} / ${message.client.convert.convertTime(total)}\`` }
			)
            .setFooter({ text: `Request by ${message.author.tag} • ${message.client.footer.status(queue)}`, iconURL: message.author.displayAvatarURL() });
        message.channel.send({ embeds: [embed] });

    }
}