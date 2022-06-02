/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autoplay",
    category: "Music",
    aliases: [ "ap" ],
    description: "AutoPlay Music",
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

        if (!queue.autoplay) {
            message.client.distube.toggleAutoplay(queue);

            embed.setDescription(`${message.client.emoji.autoplay} | Successfully activated **autoplay** mode.`);
            message.channel.send({ embeds: [embed] });
        } else {
            message.client.distube.toggleAutoplay(queue);

            embed.setDescription(`${message.client.emoji.autoplay} | Successfully deactivated **autoplay** mode.`);
            message.channel.send({ embeds: [embed] });
        }
    }
}