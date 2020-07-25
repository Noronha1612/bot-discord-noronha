const Discord = require('discord.js');
const axios = require('axios').default;

const client = new Discord.Client();
const config = require('./config.js');

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

    if ( comando === 'lfw' ) {
        const responseRiot = await axios.get('https://br1.api.riotgames.com/lol/platform/v3/champion-rotations', {headers: {
            'X-Riot-Token': process.env.riot_token
        }});

        const championIds = responseRiot.data.freeChampionIds;

        const allChampionsResponse = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json');

        const allChampions = allChampionsResponse.data.data;

        const championNames = Object.values(allChampions)
            .filter(champ => championIds.includes(parseInt(champ.key)))
            .map(champ => champ.name);

        championNames.forEach(name => {
            msg.channel.send(`${championNames.indexOf(name) + 1}° Champion da free weak essa semana é ${name}`);
        });
    }
})

client.login(config.token);
