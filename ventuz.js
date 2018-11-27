// Account generator bot for Discordapp.com by jewdev (from Nulled.to)
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

const config = require('./config.json');

client.on('error', () => console.error);
client.on('warn', () => console.warn);

client.on('ready', async () => {
    console.log('bot was made by ventuz ');

    client.user.setActivity('ventuz coded me',  { type: "WATCHING" });
});

client.on('message', async (msg) => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith(config.PREFIX)) return;
    if(msg.content.indexOf(config.PREFIX) !== 0) return;

    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, msg, args, config);
    } catch (e) {
        console.log(e);
    }
});

client.login(config.TOKEN);