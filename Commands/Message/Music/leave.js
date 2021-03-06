/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    category: "Music",
    aliases: [ "dc" ],
    description: "Leave Voice Channel",
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

		const embed = new EmbedBuilder()
            .setColor(message.client.color)
            .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        const queue = message.client.distube.getQueue(message);
        
        if (queue) {
            message.client.distube.stop(message);
            message.client.distube.voices.leave(message.guild);

            embed.setDescription(`${message.client.emoji.leave} | Successfully **Leave** the voice channel.`);
			message.channel.send({ embeds: [embed] });
        } else {
            message.client.distube.voices.leave(message.guild);

            embed.setDescription(`${message.client.emoji.leave} | Successfully **Leave** the voice channel.`);
			message.channel.send({ embeds: [embed] });
        }

    }
}
