const disc = require('discord.js');
const client = new disc.Client();
const ax = require('axios');


const base_jikon_url = "https://api.jikan.moe/v3"

client.login("NzQxMjYxODg2NDA2MDAwNjUw.Xy0_7Q.cAERF0wqG5LnslwUeFSQY40HkUQ");

client.on('ready', () => {
    console.log(`Bot online: ${client.user.tag}!`);
});

client.on("message", msg => {
    console.log(msg ,' qq msg ')
    if (!msg.author.bot) {

        msg.content.startsWith(".commands") ? showOptions(msg) : null

        msg.content.startsWith("!anime") ? jikanApi(msg) : null 
        msg.content.startsWith("!manga") ? jikanApi(msg) : null 

        if (msg.content.startsWith(".clear")) {
            let num = msg.content.slice(7)
            msg.reply(`Cleanning ${num} messages, please wait few seconds`)
            msg.channel.messages.fetch({ limit: num }).then(messages => {
                msg.channel.bulkDelete(messages)
            });
            msg.reply("Messages cleaned")
        }
    }
})

function showOptions(msg) {
    msg.reply(`
You can use this commands for this moment:
    .clear <number> - to clean x messages
    !anime <name>   - to see some pic about x anime
    !manga <name>   - temporary disabled               
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
        await ax.get(`${base_jikon_url}/search/${url}?q=${search}&page=1`).then(res => msg.reply(res.data.results[0].image_url));
    } catch (error) {
        console.error(error);
    }
}

async function manga(url, search, msg) {
    try {
        await ax.get(`${base_jikon_url}/search/${url}?q=${search}&page=1`).then(res => msg.reply(res.data.results[0].image_url));
    } catch (error) {
        console.error(error);
    }
}