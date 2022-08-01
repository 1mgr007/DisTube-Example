/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skip",
    category: "Music",
    aliases: [ "s" ],
    description: "Skip Music",
    args: false,
    usage: [],
    examples: [],
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

		message.client.distube.skip(message)
		.then(song => {
			embed.setDescription(`${message.client.emoji.skip} | Successfully **Skipped** a song.`);
			message.channel.send({ embeds: [embed] });
		})
		.catch(error => {
			if (error.code === "NO_UP_NEXT") {
				message.client.distube.stop(message)
				.then(song => {
					embed.setDescription(`${message.client.emoji.skip} | **Skip** a song.`);
					message.channel.send({ embeds: [embed] });
				})
				.catch(error => {
					return message.channel.send(`${message.client.emoji.error} | An error occurred while skip the song.`); 
				});
			} else {
				return message.channel.send(`${message.client.emoji.error} | An error occurred while skip the queue.`); 
			}
		});

    }
}