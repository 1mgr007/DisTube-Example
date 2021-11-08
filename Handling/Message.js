const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = async (client) => {
    client.commands = new Collection();
    client.categories = readdirSync("./Commands/Message/");

    readdirSync(`${process.cwd()}/Commands/Message/`).forEach(dir => {
        const commandFiles = readdirSync(`${process.cwd()}/Commands/Message/${dir}/`).filter(f => f.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${process.cwd()}/Commands/Message/${dir}/${file}`);
            client.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
            client.commands.set(command.name, command);
        }
    });
}