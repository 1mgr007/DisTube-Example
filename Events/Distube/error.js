const { EmbedBuilder } = require("discord.js");

module.exports = async (client, channel, err) => {

    console.log(err);

    let embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`${client.emoji.error} | An error encountered: \n${err}`);
    channel.send({ embeds: [embed] });

    let owner = client.users.cache.get(client.owner[0]);
    owner.send({ content: `${client.emoji.error} | An error encountered: \n${err}\n<#${channel.id}>` });

}