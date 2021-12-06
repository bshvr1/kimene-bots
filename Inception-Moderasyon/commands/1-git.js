const Discord = require("discord.js");
const Command = require("../base/Command.js");
class Git extends Command {
    constructor(client) {
        super(client, {
            name: "git",
            aliases: ["go"]
        });
    }
    async run(message, args, data) {
        let kullanici = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!message.member.voice.channel) return this.client.yolla("Bir kullanıcının odasına gitmek için ilk önce kendiniz ses kanalına girmelisiniz.", message.author, message.channel)
        if(!kullanici) return this.client.yolla("Odasına gitmek istedğiniz kullanıcıyı belirtmeniz gerekir", message.author, message.channel)
        if(!kullanici.voice.channel) return this.client.yolla("Odasına gitmek istediğiniz kullanıcı ses kanallarında bulunmuyor", message.author, message.channel)
        if(message.member.voice.channel.id === kullanici.voice.channel.id) return this.client.yolla("Odasına gitmek istediğinizi kullanıcı ile aynı odada bulunuyorsunuz!")
        const filter = (reaction, user) => {
        return (["kimene_ok", "kimene_no"].includes(reaction.emoji.name) && user.id === kullanici.id);
    };
        let teklif = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${message.author} adlı kullanıcı sizin sesli kanalınıza gelmek istiyor kabul ediyor musunuz?`)
        .setColor("RANDOM")
        let mesaj = await message.channel.send(`${kullanici}`,teklif)
        await mesaj.react(this.client.ok);
        await mesaj.react(this.client.no);
        mesaj.awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
            })
            .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === "kimene_ok") {
        let kabul = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${message.author} başarıyla **${kullanici.voice.channel.name}** adlı kanala gittiniz.`)
        .setColor("RANDOM")
        .setFooter(this.client.config.footer)
        message.channel.send(kabul).then(msg => { msg.delete({ timeout: 10000 }) })
        message.member.voice.setChannel(kullanici.voice.channel);
            } else {
        let redd = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${message.author} Sesli kanalına gitmek istediğiniz üye teklifinizi geri çevirdi!`)
        .setColor("RANDOM")
        .setFooter(this.client.config.footer)
        message.channel.send(redd).then(msg => { msg.delete({ timeout: 10000 }) })
            }
      }); 
    }
}
module.exports = Git;