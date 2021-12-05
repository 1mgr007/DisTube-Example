/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, result, query) => {

    // If DisTubeOptions.searchSongs = true
    let i = 0
    let embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`🔎 | **Choose an option from below**\n${result.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}`)
        .setFooter(`Enter anything else or wait 60 seconds to cancel`);
    message.channel.send({ embeds: [embed] });

}