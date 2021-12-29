/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: [ "np" ],
    description: "Show playing song",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send(`❌ | There is no music playing!`);

        const currentSong = queue.songs[0];

        // Progress Bar
        var total = currentSong.duration * 1000;
        var current = queue.currentTime * 1000;
        var size = 30;
        var line = '─';
        var slider = "🎵";

        let embed = new MessageEmbed()
            .setTitle('🎵 Now Playing')
            .setDescription(`[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
            .setThumbnail(currentSong.thumbnail)
            .setColor(message.client.color)
            .addField("\u200b", message.client.progressbar.progressbar(total, current, size, line, slider))
            .addField("\u200b", `\`${message.client.convert.convertTime(current)} / ${message.client.convert.convertTime(total)}\``)
            .setFooter({ text: `Request by ${message.author.tag} • ${message.client.footer.status(queue)}`, iconURL: message.author.displayAvatarURL() });
        message.channel.send({ embeds: [embed] });

    }
}