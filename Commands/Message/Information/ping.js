/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    aliases: [],
    description: "Check Ping Bot",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Ping : **${message.client.ws.ping}**ms`);
        message.channel.send({ embeds: [embed] });
    }
}