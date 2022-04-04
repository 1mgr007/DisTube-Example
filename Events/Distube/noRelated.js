module.exports = async (client, queue) => {

    queue.textChannel.send(`${client.emoji.error} | Can't find related video to play. Stop playing music.`);

}