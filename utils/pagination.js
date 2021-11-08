/* eslint-disable no-unused-vars */
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    button: async function (message, arrays, embed, timeout = 120000) {

        const backId = "back";
        const forwardId = "forward";
        const backButton = new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Back")
            .setEmoji("⏪")
            .setCustomId(backId);
        const forwardButton = new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Forward")
            .setEmoji("⏩")
            .setCustomId(forwardId);

        const array = arrays;

        const generateEmbed = async (start) => {
            const current = array.slice(start, start + 10);

            embed.setDescription(`${current.join("\n")}`);
            return embed;
        };

        const canFitOnOnePage = array.length <= 10;

        const row1 = new MessageActionRow().addComponents([forwardButton]);

        const embeds = await generateEmbed(0);

        const embedMessage = await message.channel.send({
            embeds: [embeds],
            components: canFitOnOnePage ? [] : [row1],
        });

        if (canFitOnOnePage) return;

        const collector = embedMessage.createMessageComponentCollector({
            filter: ({ user }) => user.id === message.author.id,
            time: timeout,
        });

        let currentIndex = 0;

        collector.on("collect", async (interaction) => {
            interaction.customId === backId
                ? (currentIndex -= 10)
                : (currentIndex += 10);

            const row2 = new MessageActionRow().addComponents([
                ...(currentIndex ? [backButton] : []),
                ...(currentIndex + 10 < array.length ? [forwardButton] : []),
            ]);

            const embed = await generateEmbed(currentIndex);

            await interaction.update({
                embeds: [embed],
                components: [row2],
            });
        });
        // eslint-disable-next-line no-unused-vars
        collector.on("end", (collected) => {
            embedMessage.edit({ components: [] });
        });
    },
    reaction: async function (message, arrays, embed, footer, timeout = 60000) {
        const array = arrays;

        const generateEmbed = start => {
            const current = array.slice(start, start + 10);

            embed.setDescription(current.join('\n') + `\n\nShowing ${footer} ${start + 1}-${start + current.length} out of ${array.length}`);
            return embed;
        }

        message.channel.send({ embeds: [generateEmbed(0)] }).then(async msg => {
            if (array.length <= 10) return;

            await msg.react('➡️');

            const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id == message.author.id;
            const collector = msg.createReactionCollector({ filter, time: timeout });

            let currentIndex = 0;
            collector.on('collect', async reaction => {
                await msg.reactions.removeAll();

                reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10

                await msg.edit({ embeds: [ generateEmbed(currentIndex) ] });

                if (currentIndex !== 0) await msg.react('⬅️');

                if (currentIndex + 10 < array.length) await msg.react('➡️');
            });
            collector.on("end", async collected => {
                await msg.reactions.removeAll();
            });
        })
    }
}