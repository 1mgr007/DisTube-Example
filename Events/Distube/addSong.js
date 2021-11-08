const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, song) => {

    let embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`🎵 Add Song \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
        .setThumbnail(song.thumbnail)
        .setFooter(`Request by ${song.user.tag}`, song.user.displayAvatarURL());
    queue.textChannel.send({ embeds: [embed] });

}