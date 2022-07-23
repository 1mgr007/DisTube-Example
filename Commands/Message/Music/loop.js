const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    category: "Music",
    aliases: [ "repeat" ],
    description: "Stop thr queue",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
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

        const embederror = new EmbedBuilder()
            .setColor("#ff0000");

        const input = args[0];

        if (!input) {
            if (queue.repeatMode === 0) {
                message.client.distube.setRepeatMode(message, 1);

                embed.setDescription(`${message.client.emoji.loop} | **Looping** a song.`);
                message.channel.send({ embeds: [embed] });
            } else {
                message.client.distube.setRepeatMode(message, 0);

                embed.setDescription(`${message.client.emoji.loop} | Stop **looping** song.`);
                message.channel.send({ embeds: [embed] });
            }
        } else if (input === "lagu" || input === "song") {
            message.client.distube.setRepeatMode(message, 1);

            embed.setDescription(`${message.client.emoji.loop} | **Looping** a song.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "queue" || input === "all") {
            message.client.distube.setRepeatMode(message, 2);

            embed.setDescription(`${message.client.emoji.loop} | **Looping** all the queue.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "off") {
            message.client.distube.setRepeatMode(message, 0);

            embed.setDescription(`${message.client.emoji.loop} | Stop **looping** song.`);
            message.channel.send({ embeds: [embed] });
        } else {
            embederror.setDescription(`${message.client.emoji.error} | Please enter valid arguments!
Loop Song: ${message.client.prefix}loop
Loop Queue: ${message.client.prefix}loop queue
Turn OFF Loop: ${message.client.prefix}loop off`);
            message.channel.send({ embeds: [embederror] });
        }
    }
}