const disc = require('discord.js');
const client = new disc.Client();
const ax = require('axios');


const base_jikon_url = "https://api.jikan.moe/v3"

client.login("Token");

client.on('ready', () => {
    console.log(`Bot online: ${client.user.tag}!`);
});

client.on("message", msg => {
    if (!msg.author.bot) {

        msg.content.startsWith(".commands") ? showOptions(msg) : null

        msg.content.startsWith("!anime") ? jikanApi(msg) : null
        msg.content.startsWith("!manga") ? jikanApi(msg) : null

        if (msg.content.startsWith(".clear")) {
            let num = parseInt(msg.content.slice(7));
            msg.channel.messages.fetch({ limit: num + 1 }).then(messages => {
                msg.channel.bulkDelete(messages)
            });
            msg.channel.send(" ### Messages cleaned ### ");
        }
    }
})

function showOptions(msg) {
    msg.channel.send(`
You can use this commands for this moment:
    .clear <number> - to clean x messages
    !anime <name>   - to see some pic about x anime
    !manga <name>   - to see some pic about x manga               
    `)
}

// https://api.jikan.moe/v3/search/anime?q=re zero&page=1
function jikanApi(msg) {
    console.log(msg, ' maga')
    var sr = msg.content;
    var result = sr.toLowerCase().startsWith("!anime") ? anime("anime", sr.slice(7), msg).then(res => res) : manga("manga", sr.slice(7), msg).then(res => res)
    return result;
}

async function anime(url, search, msg) {
    try {
        await ax.get(`${base_jikon_url}/search/${url}?q=${search}&page=1`).then(res => msg.channel.send(res.data.results[0].image_url));
    } catch (error) {
        console.error(error);
    }
}

async function manga(url, search, msg) {
    try {
        await ax.get(`${base_jikon_url}/search/${url}?q=${search}&page=1`).then(res => msg.channel.send(res.data.results[0].image_url));
    } catch (error) {
        console.error(error);
    }
}