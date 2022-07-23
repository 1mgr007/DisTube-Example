const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "filter",
    category: "Music",
    aliases: [ "eq", "equalizer" ],
    description: "Audio Filters",
    args: false,
    usage: [ "<3d, bassboost, echo, karaoke, nightcore, vaporwave>", "off" ],
    examples: [ "bassboost", "off" ],
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

        let filter = ['3d', 'bassboost', 'echo', 'flanger', 'gate', 'haas', 'karaoke', 'nightcore', 'reverse', 'vaporwave', 'mcompand', 'phaser', 'tremolo', 'surround', 'earwax'];

        const input = args[0];
        if (!input) {
            embederror.setDescription(`${message.client.emoji.error} | You didn't provide any arguments!
Examples: ${message.client.prefix}filter bassboost
Valid Filter: ${filter.join(", ")}
Turn OFF Filter: ${message.client.prefix}filter off`);
            message.channel.send({ embeds: [embederror] });
        }

        if (filter.includes(input)) {
            message.client.distube.setFilter(message, input, true);

            embed.setDescription(`${message.client.emoji.filter} | Current queue filter: ${input}.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "off") {
            message.client.distube.setFilter(message, false, true);

            embed.setDescription(`${message.client.emoji.filter} | Disable queue filter.`);
            message.channel.send({ embeds: [embed] });
        } else {
            embederror.setDescription(`${message.client.emoji.error} | Please enter valid arguments!
Valid Filter: ${filter.join(", ")}
Turn OFF Filter: ${message.client.prefix}filter off`);
            message.channel.send({ embeds: [embederror] });
        }
    }
}