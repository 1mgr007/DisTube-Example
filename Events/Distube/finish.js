module.exports = async (client, queue) => {

    queue.textChannel.send(`${client.emoji.error} | No more song in queue`);

}