/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    aliases: [],
    description: "Check Ping Bot",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SendMessages" ],
    owner: false,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setColor(message.client.color)
            .setDescription(`Ping : **${message.client.ws.ping}**ms`);
        message.channel.send({ embeds: [embed] });
    }
}