module.exports = async (client, message, query) => {

    message.channel.send(`${client.emoji.error} | No result found for ${query}!`);

}