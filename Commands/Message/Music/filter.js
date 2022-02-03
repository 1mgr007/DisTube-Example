const { MessageEmbed } = require("discord.js");

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
        if (!memberVC) return message.reply(`❌ | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.reply(`❌ | I'm not on any voice channel!`);

        if (memberVC !== clientVC) return message.reply(`❌ | You must be in the same channel as ${message.client.user}!`);

        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.reply(`❌ | There is no music playing!`);

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        const embederror = new MessageEmbed()
            .setColor("#ff0000");

        let filter = ['3d', 'bassboost', 'echo', 'flanger', 'gate', 'haas', 'karaoke', 'nightcore', 'reverse', 'vaporwave', 'mcompand', 'phaser', 'tremolo', 'surround', 'earwax'];

        const input = args[0];
        if (!input) {
            embederror.setDescription(`❌ | You didn't provide any arguments!
Examples: ${message.client.prefix}filter bassboost
Valid Filter: ${filter.join(", ")}
Turn OFF Filter: ${message.client.prefix}filter off`);
            message.channel.send({ embeds: [embederror] });
        }

        if (filter.includes(input)) {
            message.client.distube.setFilter(message, input, true);

            embed.setDescription(`🎛️ | Current queue filter: ${input}.`);
            message.channel.send({ embeds: [embed] });
        } else if (input === "off") {
            message.client.distube.setFilter(message, false, true);

            embed.setDescription(`🎛️ | Disable queue filter.`);
            message.channel.send({ embeds: [embed] });
        } else {
            embederror.setDescription(`❌ | Please enter valid arguments!
Valid Filter: ${filter.join(", ")}
Turn OFF Filter: ${message.client.prefix}filter off`);
            message.channel.send({ embeds: [embederror] });
        }
    }
}