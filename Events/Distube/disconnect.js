const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {

    const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.emoji.leave} | **Leave** the voice channel.\nThank you for using ${client.user.username}!`)
        .setImage(client.musicimg)
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });
    queue.textChannel.send({ embeds: [embed] });

}