const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {

    let embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`${client.emoji.music} | Add Song \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Request by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() });
    queue.textChannel.send({ embeds: [embed] });

}