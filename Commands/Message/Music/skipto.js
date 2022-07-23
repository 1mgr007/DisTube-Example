/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skipto",
    category: "Music",
    aliases: [ "jump" ],
    description: "Skip Music",
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

        let target = parseInt(args[0]);
        if (isNaN(target)) return message.reply(`${message.client.emoji.error} | Please enter a valid number!`)

        message.client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                embed.setDescription(`${message.client.emoji.skip} | Successfully **Skipped** ${args[0]} songs.`);
                message.channel.send({ embeds: [embed] });
            })
            .catch(error => {
                return message.channel.send(`${message.client.emoji.error} | An error occurred while skip the song.`); 
            });
    }
}