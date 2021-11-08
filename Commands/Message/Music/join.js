/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    category: "Music",
    aliases: [ "j" ],
    description: "Join Voice Channel",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {

		const memberVC = message.member.voice.channel;
        const clientVC = message.guild.me.voice.channel;

		if (!memberVC) return message.channel.send(`❌ | You must be in a voice channel!`);
		if (clientVC && clientVC === memberVC) return message.channel.send(`❌ | I'm already on your voice channel!`);
		if (clientVC && clientVC !== memberVC) return message.channel.send(`❌ | You must be in the same channel as ${message.client.user}!`);

		const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());

		message.client.distube.voices.join(memberVC)
			.then(voice => {
				embed.setDescription(`✔️ | Successfully **Join** the voice channel.`);
				message.channel.send({ embeds: [embed] });
			})
			.catch(error => {
				console.error(error);
				return message.channel.send(`❌ | An error occurred while trying to join the voice channel.\nTry using the **Play** command!`);
			});

    }
}