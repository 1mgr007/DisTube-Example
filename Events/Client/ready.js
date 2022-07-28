module.exports = async (client) => {
    await client.guilds.cache.each(async guild => {
        await guild.members.fetch({ withPresences: true, force: true });
    });

    //If the bot is ready it sends a message in the console
    client.logger.log(`${client.user.username} Sudah online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`, "ready");

    //Game
    let statuses = [`Prefix : ${client.prefix}`];
    setInterval(function() {
        let status = statuses[Math.floor(Math.random()*statuses.length)];
        client.user.setActivity(status, {type: "PLAYING"});
    }, 10000)

}