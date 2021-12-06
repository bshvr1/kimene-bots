const { Discord, Client, Guild, GuildChannel, TextChannel, MessageEmbed } = require("discord.js")
const client = new Client()
const mongoose = require("mongoose")
const Database = require("./models/roles.js");
const config = require("./config.json")
const { async } = require("regenerator-runtime")
const Bots = global.Bots = [];
mongoose.connect("mongodb+srv://kimeneshu:kimeneshu1231@cluster0.zwuvi.mongodb.net/İnception?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let Tokens = config.tokens;

Tokens.forEach(token => {
    let bot = new Client();
    bot.on("ready", () => {
        console.log(`${bot.user.tag} - giriş yaptı.`);
        bot.user.setActivity("Kimene ❤️ İnception")
        bot.Busy = false;
        bot.Uj = 0;
        Bots.push(bot);
    })

    bot.login(token).then(e => {
    }).catch(e => {
        console.error(`${token.substring(Math.floor(token.length / 2))} giriş yapamadı.`);
    });
});

client.on("ready", async () => {
    client.user.setActivity("Veronica ❤️ Wency")
    console.log("Ana bot aktif")
    rolBeyckup();
    setInterval(() => {
        rolBeyckup();
      }, 1000 * 60 * 60 * 1);
})

client.on("message", async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.author.id !== "324130263036723200") return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(config.prefix.length);
    
    if(command === "kur" && message.author.id === "324130263036723200") {
        if (!args[0] || isNaN(args[0])) return message.channel.send("Geçerli bir rol ID'si belirtmelisin!");
        let data = await Database.findOne({guildID: config.guildID, roleID: args[0]})
        if(!data) return message.channel.send(`Kurmaya çalıştığınız backup ID bulunamadı.`)

        Database.findOne({ guildID: config.guildID, roleID: args[0] }, async (err, roleData) => {

            let yeniRol = await message.guild.roles.create({
                data: {
                    name: roleData.name,
                    color: roleData.color,
                    hoist: roleData.hoist,
                    permissions: roleData.permissions,
                    position: roleData.position,
                    mentionable: roleData.mentionable
                },
            });
            setTimeout(() => {
                let kanalPermVeri = roleData.channelOverwrites;
                if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
                  let kanal = message.guild.channels.cache.get(perm.id);
                  if (!kanal) return;
                  setTimeout(() => {
                    let yeniKanalPermVeri = {};
                    perm.allow.forEach(p => {
                      yeniKanalPermVeri[p] = true;
                    });
                    perm.deny.forEach(p => {
                      yeniKanalPermVeri[p] = false;
                    });
                    kanal.createOverwrite(yeniRol, yeniKanalPermVeri).catch(console.error);
                  }, index*5000);
                });
              }, 5000);
            let length = data.members.length;
            if (length <= 0) return console.log(`[${yeniRol.id}] Olayında kayıtlı üye olmadığından dolayı rol dağıtımı gerçekleştirmedim. `);
            let availableBots = Bots.filter(e => !e.Busy);
            if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => y.Uj - x.Uj).slice(0, Math.round(length / Bots.length));
            let perAnyBotMembers = Math.floor(length / availableBots.length);
            if (perAnyBotMembers < 1) perAnyBotMembers = 1;
            for (let index = 0; index < availableBots.length; index++) {
                const bot = availableBots[index];
                let ids = data.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
                if (ids.length <= 0) { processBot(bot, false, -perAnyBotMembers); break; }
                let guild = bot.guilds.cache.first();
                message.channel.send(`Başarılı bir şekilde kurulum başladı roller dağıtılıp odalara ekleniyor.`)
                ids.every(async id => {
                    let member = message.guild.members.cache.get(id);
                    if (!member) {
                        return true;
                    }
                    setTimeout(async () => {
                        if (member.roles.cache.has(yeniRol.id)) return
                        await member.roles.add(yeniRol.id)
                    }, index * 1250);
                });
                processBot(bot, false, -perAnyBotMembers);
            }
        }
        )
    }
    })


function rolBeyckup() {
    Database.deleteMany({});
    const guild = client.guilds.cache.get(config.guildID)
    if (Database) { Database.deleteMany({}); }
    guild.roles.cache.filter(r => r.name !== "@everyone" && !r.managed).forEach(async role => {
        let roleChannelOverwrites = [];
        guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id)).forEach(c => {
            let channelPerm = c.permissionOverwrites.get(role.id);
            let pushlanacak = { id: c.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
            roleChannelOverwrites.push(pushlanacak);
        });
        await new Database({
            _id: new mongoose.Types.ObjectId(),
            guildID: config.guildID,
            roleID: role.id,
            name: role.name,
            color: role.hexColor,
            hoist: role.hoist,
            position: role.position,
            permissions: role.permissions,
            mentionable: role.mentionable,
            time: Date.now(),
            members: role.members.map(m => m.id),
            channelOverwrites: roleChannelOverwrites
        }).save();
    })
    console.log("yedeklendi")
    client.channels.cache.get(config.channelID).send(`${config.emoji} Sunucu rolleri güvenlik amaçlı yedeklendi!`)
}


function giveBot(length) {
    if (length > Bots.length) length = Bots.length;
    let availableBots = Bots.filter(e => !e.Busy);
    if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => x.Uj - y.Uj).slice(0, length);

    return availableBots;
}

function processBot(bot, busy, job, equal = false) {
    bot.Busy = busy;
    if (equal) bot.Uj = job;
    else bot.Uj += job;

    let index = Bots.findIndex(e => e.user.id == bot.user.id);
    Bots[index] = bot;
}



client.login(config.token)
