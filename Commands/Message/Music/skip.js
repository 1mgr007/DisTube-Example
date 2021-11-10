/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "Music",
    aliases: [ "s" ],
    description: "Skip Music",
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

        if (queue.songs.length === 1) {
            message.client.distube.stop(message)
                .then(song => {
                    embed.setDescription(`⏩ | **Skip** a song.`);
                    message.channel.send({ embeds: [embed] });
                })
                .catch(error => {
                    return message.channel.send("❌ | An error occurred while skip the song."); 
                });
        } else {
            message.client.distube.skip(message)
                .then(song => {
                    embed.setDescription(`⏩ | Successfully **Skipped** a song.`);
                    message.channel.send({ embeds: [embed] });
                })
                .catch(error => {
                    return message.channel.send("❌ | An error occurred while shuffle  the queue."); 
                });
        }
    }
}