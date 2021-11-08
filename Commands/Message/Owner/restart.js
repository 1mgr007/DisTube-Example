/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "restart",
    category: "owner",
    aliases: [],
    description: "",
    args: true,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: true,
    async execute(client, message, args) {
        const embed = new MessageEmbed()
            .setColor("BLACK")
            .setDescription(`Restarting bot.`);
        message.channel.send({ embeds: [embed] }).then(message => {
            process.exit();
        });
		
    }
}