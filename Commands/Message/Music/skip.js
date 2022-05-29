/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "Music",
    aliases: [ "s" ],
    description: "Skip Music",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply(`${message.client.emoji.error} | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.reply(`${message.client.emoji.error} | I'm not on any voice channel!`);

        if (memberVC !== clientVC) return message.reply(`${message.client.emoji.error} | You must be in the same channel as ${message.client.user}!`);

        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.reply(`${message.client.emoji.error} | There is no music playing!`);

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

		if (queue.autoplay) {
			await message.client.distube.addRelatedSong(queue)
			.then(song => {
                message.client.distube.skip(message)
					.then(song => {
						embed.setDescription(`${message.client.emoji.skip} | Successfully **Skipped** a song.`);
						message.channel.send({ embeds: [embed] });
					})
					.catch(error => {
						return message.channel.send(`${message.client.emoji.error} | An error occurred while shuffle  the queue.`); 
					});
            })
		} else {
			if (queue.songs.length === 1) {
				message.client.distube.stop(message)
					.then(song => {
						embed.setDescription(`${message.client.emoji.skip} | **Skip** a song.`);
						message.channel.send({ embeds: [embed] });
					})
					.catch(error => {
						return message.channel.send(`${message.client.emoji.error} | An error occurred while skip the song.`); 
					});
			} else {
				message.client.distube.skip(message)
					.then(song => {
						embed.setDescription(`${message.client.emoji.skip} | Successfully **Skipped** a song.`);
						message.channel.send({ embeds: [embed] });
					})
					.catch(error => {
						return message.channel.send(`${message.client.emoji.error} | An error occurred while shuffle  the queue.`); 
					});
			}
		}
        
    }
}