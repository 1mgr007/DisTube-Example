/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h" ],
    description: "Show all commands, or one specific command",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setColor(message.client.color)
            .setAuthor({ name: message.client.user.username, iconURL: message.client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }) })
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL());

        if (!args[0]) {
            const commands = (category) => {
                return message.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(", ");
            }

            const infoFilter1 = message.client.categories.filter(cat => cat !== "Owner");
            const info = infoFilter1.map(cat => stripIndents`${message.client.emoji.folder} **${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`).reduce((string, category) => string + "\n\n" + category);
    
            embed.setTitle(`${message.client.emoji.cmdlist} Command List`)
            embed.setDescription(`● To get help on a specific command type \`${message.client.prefix}help <command>\`!\n\n${info}`);
            message.channel.send({ embeds: [embed] });
        } else {
            let command = message.client.commands.find(cmd => cmd.name === args[0]) || message.client.commands.find(cmd => cmd.aliases.includes(args[0]))
            if (!command) return;

            let name = command.name;

            let description = command.description;
            if (!description || description.length === 0) description = "No description";

            let aliases = command.aliases.join(", ");
            if (!aliases || aliases.length === 0) aliases = "No alias";

            let usages = command.usage;
            let usage;
            if (!usages || usages.length === 0) {
                usage = `\`${message.client.prefix}${name}\``;
            } else {
                let usagesMap = usages.map(data => `${message.client.prefix}${name} ${data}`)
                usage = usagesMap.join('\n')
            }
            
            let examples = command.examples;
            let example;
            if (!examples || examples.length === 0) {
                example = `\`${message.client.prefix}${name}\``;
            } else {
                let examplesMap = examples.map(data => `${message.client.prefix}${name} ${data}`)
                example = examplesMap.join('\n')
            }

            let memberPermissions = command.memberPermissions.join(", ").replace("_", " ");
            if (!memberPermissions || memberPermissions.length === 0) memberPermissions = "No specific member permission is required to execute this command.";

            let botPermissions = command.botPermissions.join(", ").replace("_", " ");
            if (!botPermissions || botPermissions.length === 0) botPermissions = "No specific bot permission is required to execute this command.";

            embed.setTitle(`${message.client.prefix}${name}`)
            embed.setDescription(`\`\`\`${description}\`\`\``)
            embed.addFields([ 
                { name: `Usage`, value: `${usage}` }, 
                { name: `Examples`, value: `${example}` }, 
                { name: `Aliases`, value: `__***${aliases}***__` }, 
                { name: `Member Permission`, value: `\`${memberPermissions}\`` }, 
            ]);
            message.channel.send({ embeds: [embed] });
        }
    }
};