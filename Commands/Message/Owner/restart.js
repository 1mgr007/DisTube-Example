/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "restart",
    category: "owner",
    aliases: [],
    description: "",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SendMessages" ],
    owner: true,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setColor("BLACK")
            .setDescription(`Restarting bot.`);
        message.channel.send({ embeds: [embed] }).then(message => {
            process.exit();
        });
		
    }
}