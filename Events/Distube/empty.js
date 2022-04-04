module.exports = async (client, queue) => {

    // If DisTubeOptions.leaveOnEmpty is true
    queue.textChannel.send(`${client.emoji.error} | Channel is empty.`);

}