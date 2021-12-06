const cezalar = require("../models/cezalı.js")
const mute = require("../models/chatmute.js")
const data = require("../models/yasaklıtag.js")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        const channel = member.guild.channels.cache.get(this.client.config.welcomeChannel);
        await data.findOne({ guild: member.guild.id }, async (err, res) => {
        if(res.taglar.some(x => member.user.username.includes(x)) == true) {
            member.roles.add(this.client.config.roles.bannedTagRole)
            member.setNickname('Yasaklı Tag');
            setTimeout(() => {
            member.roles.remove(this.client.config.roles.unregisterRoles)}, 2000);
            member.send("İsminde bulunan yasaklı tagdan dolayı sunucumuzda yasaklı taga atıldın. İsmindeki yasaklı tagı kaldırarak sunucumuza erişim sağlayabilirsin. Eğer her hangi bir problemin varsa üst yöneticilerimize ulaşmaktan çekinme !").catch(e => console.log('Mesaj atamıyorum.'))
            return
        }
        if (Date.now() - member.user.createdTimestamp < ms("5d")) return member.roles.set([this.client.config.roles.suspectedRole])
        let mutedDB = await mute.findOne({ user: member.id })
        if (mutedDB && mutedDB.muted == true) member.roles.add(this.client.config.roles.chatMutedRole)
        if (member.user.username.includes(""+this.client.config.tag+"")) member.roles.add(this.client.config.roles.familyRole)
        let cezalıDB = await cezalar.findOne({ user: member.id })
        if (!cezalıDB) return member.roles.add(this.client.config.roles.unregisterRoles)
        channel.send(`
${member}, Hesabın ${member.guild.name} sunucumuza hoş geldin.🎉🎉🎉 
Seninle beraber sunucumuz ${member.guild.memberCount} üye sayısına ulaştı. 

Hesabın ${moment(member.user.createdTimestamp).format("LLL")} \`(${moment(member.user.createdTimestamp).fromNow()})\` oluşturulmuş.

<#913542577742037012> kanalına göz atmayı unutmayınız.

Kayıt olduktan sonra kuralları okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız. 
**Sunucumuz şuanda Taglı (∞) alımdadır.**
    `);
        if (cezalıDB && cezalıDB.ceza == true) return await member.roles.set([this.client.config.roles.karantinaRole])
        if (cezalıDB && cezalıDB.ceza == false) return await member.roles.set(this.client.config.roles.unregisterRoles)
    })
    }
};
