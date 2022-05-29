module.exports = {
    name: "play",
    category: "Music",
    aliases: [ "p" ],
    description: "Play a song",
    args: true,
    usage: [ "<YouTube URL>", "<Video Name>", "<Spotify URL>" ],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply(`${message.client.emoji.error} | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (clientVC && clientVC !== memberVC) return message.reply(`${message.client.emoji.error} | You must be in the same channel as ${message.client.user}!`);

        await message.client.distube.play(memberVC, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message
        });
        
    }
}