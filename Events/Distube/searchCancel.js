/* eslint-disable no-unused-vars */
module.exports = async (client, message, query) => {
    // If DisTubeOptions.searchSongs = true
    message.channel.send(`${client.emoji.error} | Searching canceled!`);

}