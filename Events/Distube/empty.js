module.exports = async (client, queue) => {

    // If DisTubeOptions.leaveOnEmpty is true
    queue.textChannel.send(`❌ | Channel is empty.`);

}