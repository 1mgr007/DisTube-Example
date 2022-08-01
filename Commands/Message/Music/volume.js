/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "volume",
    category: "Music",
    aliases: [ "v" ],
    description: "Set Volume",
    args: false,
    usage: [ "<Number of volume between 0 - 100>" ],
    examples: [ "100" ],
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

        let volume = parseInt(args[0]);
        if (!volume) {
            embed.setDescription(`${message.client.emoji.volume} | Current **Volume** : \`${queue.volume}\`%`);
            return message.channel.send({ embeds: [embed] });
        }

        if (isNaN(volume)) return message.reply(`${message.client.emoji.error} | Please enter a valid number!`)

        if (volume < 0)  volume = 0;
        if (volume > 100) volume = 100;

        message.client.distube.setVolume(message, volume);

        embed.setDescription(`${message.client.emoji.volume} | Successfully changed the **Volume** to \`${volume}\`%`);
        message.channel.send({ embeds: [embed] });

    }
}