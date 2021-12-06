  
const Command = require("../base/Command.js");
const Discord = require("discord.js")
class Ekip extends Command {
    constructor(client) {
        super(client, {
            name: "Ekip",
            aliases: ["team", "ekip"]
        });
    }

    async run(message, args, data) {
        if (!message.member.hasPermission("MANAGE_ROLES")) return;
        let ekip303 = message.guild.roles.cache.get("913542479058460753")
        let tag303 = this.client.users.cache.filter(x => x.user.discriminator("0303")).size
        let ekip1940 = message.guild.roles.cache.get("916056159650185216")
        let tag1940 = this.client.users.cache.filter(x => x.user.discriminator("1940")).size
        let ekip1975 = message.guild.roles.cache.get("916781118114635867")
        let tag1975 = this.client.users.cache.filter(x => x.user.discriminator("1975")).size
        let ekip1969 = message.guild.roles.cache.get("916781142559064104")
        let tag1969 = this.client.users.cache.filter(x => x.user.discriminator("1969")).size

        let teamRoles = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name === args.join(' ')) || message.guild.roles.cache.get(args[0]);
        if (args[0]) { //
            let mentionRole = message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id)).size
            const Embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true, size: 2048}))
            .setThumbnail(message.guild.iconURL({dynamic: true, size: 2048}))
            .setDescription(`\`-\` ${teamRoles} adlı rol için detaylı bilgilendirme:\n\n\`•\` Toplam bu role sahip üye: **${mentionRole}**\n\`•\` Sunucuda ki aktif üye: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.user.presence.status !== "offline").size}**\n\`•\` Sesteki üye sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.voice.channel).size}**\n\`•\` Sunucu sembolüne sahip kullanıcı sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.user.username.includes(this.client.config.tag)).size}**\n\`•\` Seste olmayan aktif kullanıcı sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && !x.voice.channel && x.user.presence.status !== "offline").size}**\n\`•\` Erkek üye sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.roles.cache.has("852194278334660646")).size}**\n\`•\` Kadın üye sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.roles.cache.has("852194278334660647")).size}**\n───────────────\n\`•\` Ekip üyelerinin seste bulunma oranı: **%${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(teamRoles.id)).size * 100)}**`)
            .setColor(message.member.displayHexColor)
            message.channel.send(Embed).then(m => message.react(this.client.ok))
        } else if (!args[0]) {
            const TeamEmbed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true, size: 2048}))
            .setColor(message.member.displayHexColor)
            .setDescription("Aşağıdaki ekip üyelerin'i daha detaylı bir şekilde görmek için aşağıdaki komutu yazınız. \`.ekip bak @ekiprol\`")
            .addField(`<@${ekip303} Ekip Bilgileri`, `Toplam Üye: **${ViaTeam.members.size}**\n Taglı Üye: \`${tag303}\` \n Çevrimiçi Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip303.id) && x.user.presence.status !== "offline").size}\` \n Sesteki Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip303.id) && x.voice.channel).size}\` \n Seste Olmayan Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip303.id) && !x.voice.channel && x.user.presence.status !== "offline").size}\` \n─────────────────\n`)
            .addField(`<@${ekip1940} Ekip Bilgileri`, `Toplam Üye: **${ViaTeam.members.size}**\n Taglı Üye: \`${tag1940}\` \n Çevrimiçi Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1940.id) && x.user.presence.status !== "offline").size}\` \n Sesteki Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1940.id) && x.voice.channel).size}\` \n Seste Olmayan Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1940.id) && !x.voice.channel && x.user.presence.status !== "offline").size}\` \n─────────────────\n`)
            .addField(`<@${ekip1975} Ekip Bilgileri`, `Toplam Üye: **${ViaTeam.members.size}**\n Taglı Üye: \`${tag1975}\` \n Çevrimiçi Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1975.id) && x.user.presence.status !== "offline").size}\` \n Sesteki Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1975.id) && x.voice.channel).size}\` \n Seste Olmayan Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1975.id) && !x.voice.channel && x.user.presence.status !== "offline").size}\` \n─────────────────\n`)
            .addField(`<@${ekip1969} Ekip Bilgileri`, `Toplam Üye: **${ViaTeam.members.size}**\n Taglı Üye: \`${tag1969}\` \n Çevrimiçi Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1969.id) && x.user.presence.status !== "offline").size}\` \n Sesteki Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1969.id) && x.voice.channel).size}\` \n Seste Olmayan Üye: \`${message.guild.members.cache.filter(x => x.roles.cache.has(ekip1969.id) && !x.voice.channel && x.user.presence.status !== "offline").size}\` \n─────────────────\n`)
            .setFooter(this.client.config.footer)
            message.channel.send(TeamEmbed).then(m => message.react(this.client.ok))
        }
    } //
}

module.exports = Ekip; //
