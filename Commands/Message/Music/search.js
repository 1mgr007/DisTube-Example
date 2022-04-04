module.exports = {
    name: "search",
    category: "Music",
    aliases: [],
    description: "Search a song",
    args: true,
    usage: [ "<Video Name>" ],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply(`${message.client.emoji.error} | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (clientVC && clientVC !== memberVC) return message.reply(`${message.client.emoji.error} | You must be in the same channel as ${message.client.user}!`);

        message.client.distube.search(args.join(' '), {
            limit: 10,
            type: "video",
            safeSearch: false,
        });

    }
}