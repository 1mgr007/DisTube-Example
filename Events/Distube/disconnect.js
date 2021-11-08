const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {

    const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`✔️ | **Leave** the voice channel.\nThank you for using ${client.user.username}!`)
        .setImage(client.musicimg)
        .setFooter(client.user.username, client.user.displayAvatarURL());
    queue.textChannel.send({ embeds: [embed] });

}