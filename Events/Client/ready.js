module.exports = async (client) => {

    //If the bot is ready it sends a message in the console
    client.logger.log(`${client.user.username} Sudah online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    //Game
    let statuses = ['Created by Panji Kusuma#7473', `Prefix : ${client.prefix}`];
    setInterval(function() {
        let status = statuses[Math.floor(Math.random()*statuses.length)];
        client.user.setActivity(status, {type: "PLAYING"});
    }, 10000)

}