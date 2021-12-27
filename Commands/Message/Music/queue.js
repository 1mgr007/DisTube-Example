/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    category: "Music",
    aliases: [ "q" ],
    description: "Queue Music",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.channel.send(`❌ | There is no music playing!`);

        const currentSong = queue.songs[0];

        let filter = queue.songs.filter(song => song !== currentSong);
        let arrays = filter.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``);

        let embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor({ name: `🎶 Queue` })
            .addField("🎵 Now Playing", `[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
            .setFooter(`Request by ${message.author.tag} • ${message.client.footer.status(queue)}`, message.author.displayAvatarURL());

        if (arrays.length === 0) {
            embed.setDescription(`\`No song in queue\``);
            message.channel.send({ embeds: [embed] });
        } else {
            embed.addField("Total Song", `${arrays.length} Songs`);
            embed.addField("Total Duration", `${queue.formattedDuration}`);
            message.client.pagination.button(message, arrays, embed)
        }
    }
}