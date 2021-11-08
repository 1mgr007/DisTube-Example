/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    category: "Music",
    aliases: [],
    description: "Resume Music",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.channel.send(`❌ | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.channel.send(`❌ | I'm not on any voice channel!`);

        if (memberVC !== clientVC) return message.channel.send(`❌ | You must be in the same channel as ${message.client.user}!`);

        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send(`❌ | There is no music playing!`);

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());

        const embederror = new MessageEmbed()
            .setColor("#ff0000");

        if (!queue.paused) return message.channel.send(`❌ | The queue has been played.`);
		
		message.client.distube.resume(message);

		embed.setDescription(`▶️ | **Resume** a song.`);
		message.channel.send({ embeds: [embed] });
		
    }
}