const { readdirSync } = require('fs');

module.exports = async (client) => {
    readdirSync(`${process.cwd()}/Events/Distube/`).forEach(file => {
        const event = require(`${process.cwd()}/Events/Distube/${file}`);
        let eventName = file.split(".")[0];
        client.logger.log(`Loading Distube Events ${eventName}`, "distube");
        client.distube.on(eventName, event.bind(null, client));
    });
}