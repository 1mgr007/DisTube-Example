const { MessageEmbed } = require("discord.js");

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

        const input = args[0];

        const disable = 0;
        const song = 1;
        const queues = 2;

        if (!input) {
            message.client.distube.setRepeatMode(message, song);

            embed.setDescription(`🔁 | **Looping** a song.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "lagu" || input === "song") {
            message.client.distube.setRepeatMode(message, song);

            embed.setDescription(`🔁 | **Looping** a song.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "queue" || input === "all") {
            message.client.distube.setRepeatMode(message, queues);

            embed.setDescription(`🔁 | **Looping** all the queue.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "off") {
            message.client.distube.setRepeatMode(message, disable);

            embed.setDescription(`🔁 | Stop **looping** song.`);
            message.channel.send({ embeds: [embed] });
        } else {
            embederror.setDescription(`❌ | Please enter valid arguments!
Loop Song: ${message.client.prefix}loop song
Loop Queue: ${message.client.prefix}loop queue
Turn OFF Loop: ${message.client.prefix}loop loop`);
            message.channel.send({ embeds: [embederror] });
        }
    }
}