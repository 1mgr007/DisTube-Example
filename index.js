// Module Imports
const { Client, Partials, IntentsBitField } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("./config.json");

const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: [ Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember ],
    intents: new IntentsBitField(131071),
    shards: 'auto'
});

client.prefix = config.Prefix;
client.owner = config.OwnerId;
client.color = config.Color;
client.logger = require('./Utils/logger');

// Utils Handling
client.logger.log(`Loading Handling Utils`, "handling");
readdirSync(`./Utils/`).filter(path => path.split(".")[0] !== "logger").forEach(file => {
	let Name = file.split(".")[0];
    let Req = require(`./Utils/${file}`);
    client.logger.log(`Loading Utils ${Name}`, "util");
	client[Name] = Req;
});

// Handling
readdirSync(`./Handling/`).forEach(file => {
    let Name = file.split(".")[0];
    client.logger.log(`Loading Handling ${Name}`, "handling");
    require(`./Handling/${file}`)(client);
});

// Error Handler
client.on('error', error => console.log(error));
client.on('warn', info => console.log(info));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.login(process.env.Token);