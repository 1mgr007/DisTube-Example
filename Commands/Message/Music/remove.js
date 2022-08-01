/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "remove",
    category: "Music",
    aliases: [],
    description: "Remove a song from queue",
    args: true,
    usage: [ "{song position}" ],
    examples: [ "2" ],
    memberPermissions: [],
    botPermissions: [ "SendMessages" ],
    owner: false,
    async execute(client, message, args) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply(`${message.client.emoji.error} | You must be in a voice channel!`);

        const clientVC = message.guild.members.me.voice.channel;
        if (!clientVC) return message.reply(`${message.client.emoji.error} | I'm not on any voice channel!`);

        if (memberVC !== clientVC) return message.reply(`${message.client.emoji.error} | You must be in the same channel as ${message.client.user}!`);

        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.reply(`${message.client.emoji.error} | There is no music playing!`);

        const embed = new EmbedBuilder()
            .setColor(message.client.color)
            .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        const number = parseInt(args[0]);
        if (isNaN(number)) return message.reply(`${message.client.emoji.error} | Please enter a valid number!`);

        if (number + 1 > queue.songs.length) return message.reply(`${message.client.emoji.error} | the total number of songs in the queue is ${queue.songs.length}`);

        let track = queue.songs[number];

        if (number === 1) {
            queue.songs.splice(number, 1);
        } else {
            queue.songs.splice(number, number - 1);
        }

		embed.setDescription(`${message.client.emoji.success}| Successfully removed **${track.name}** from queue.`);
		message.channel.send({ embeds: [embed] });

    }
}