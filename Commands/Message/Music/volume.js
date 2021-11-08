/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    category: "Music",
    aliases: [ "v" ],
    description: "Set Volume",
    args: false,
    usage: [ "<Number of volume between 0 - 100>" ],
    examples: [ "100" ],
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

        let volume = parseInt(args[0]);
        if (!volume) {
            embed.setDescription(`${message.client.emoji.volume} Current **volume** : \`${queue.volume}\`%`);
            return message.channel.send({ embeds: [embed] });
        }

        if (isNaN(volume)) return message.channel.send(`❌ | Please enter a valid number!`)

        if (volume < 0)  volume = 0;
        if (volume > 100) volume = 100;

        message.client.distube.setVolume(message, volume);

        embed.setDescription(`${message.client.emoji.volume} **Volume** set to \`${volume}\`%`);
        message.channel.send({ embeds: [embed] });

    }
}