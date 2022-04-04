const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, playlist) => {

    let embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.emoji.playlist} | Add Playlist \n[${playlist.name}](${playlist.url}) \nTotal : (${playlist.songs.length} songs \`[${playlist.formattedDuration}]\``)
        .setThumbnail(playlist.thumbnail.url)
        .setFooter(`Request by ${playlist.user.tag}`, playlist.user.displayAvatarURL());
    queue.textChannel.send({ embeds: [embed] });

}