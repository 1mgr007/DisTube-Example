const { readdirSync } = require('fs');

module.exports = async (client) => {
    readdirSync(`${process.cwd()}/Events/Client/`).forEach(file => {
        const event = require(`${process.cwd()}/Events/Client/${file}`);
        let eventName = file.split(".")[0];
        client.logger.log(`Loading Client Events ${eventName}`, "event");
        client.on(eventName, event.bind(null, client));
    });
}