const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    client.user.setActivity("Bot Online!")
});

client.on('disconnect', () => {
    client.user.setActivity("Bot Offline...")
})

client.on('message', async msg => {

    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    msg.channel.bulkDelete(1);

    if (comando === 'ping') {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - msg.createdTimestamp}ms.`);
    }

    if ( comando === 'renato' ) {
        msg.channel.send("", {files: ['./assets/renato.jpg']});
    }

    if ( comando === 'lorenzo') {
        msg.channel.send("", {files: ['./assets/lorenzo.jpg']});
    }

    if ( comando === 'giovanni') {
        msg.channel.send("", {files: ['./assets/giovanni.jpg']});
    }

    if ( comando === 'mauro') {
        msg.channel.send("", {files: ['./assets/mauro.jpg']});
    }
})

client.login(config.token);
