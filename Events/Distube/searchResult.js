/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message, result, query) => {

    // If DisTubeOptions.searchSongs = true
    let i = 0
    let embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`${client.emoji.search} | **Choose an option from below**\n${result.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}`)
        .setFooter({ text: `Enter anything else or wait 60 seconds to cancel` });
    message.channel.send({ embeds: [embed] });

}