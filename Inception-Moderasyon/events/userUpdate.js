 const Discord = require("discord.js")
module.exports = class {
  constructor (client) {
    this.client = client;
  }

async run (oldUser, newUser) {
  let sunucu = this.client.config.guildID;
  let s = this.client.guilds.cache.get(sunucu).members.cache.get(newUser.id);
  let tag = "∞";
  if (newUser.username.includes(tag)) {
    let tagsayı = this.client.users.cache.filter(user => user.username.includes("∞")).size + 250
    if (!s.roles.cache.get(this.client.config.roles.familyRole)) {
      if (!s.nickname) {
        await s.roles.add(this.client.config.roles.familyRole, "Tagımızı Aldı. Kullanıcı Adı güncellenemedi. ❌"
        );
        this.client.channels.cache.get(this.client.config.channels.joinFamilyLog).send(`${this.client.ok} <@${newUser.id}> adlı üye ( ∞ ) tagını kullanıcı adına yerleştirerek aramıza katıldı! | **Sunucuda bulunan toplam taglı üyemiz: **(\`${tagsayı}\`)\n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` | Sonra ki kullanıcı adı: \`${newUser.tag}\``);
      } else {
        await s.roles.add(this.client.config.roles.familyRole, "Tagımızı Aldı. Kullanıcı Adı güncellendi. ✔️");
        s.setNickname(s.nickname.replace("•", "∞"));
        this.client.channels.cache.get(this.client.config.channels.joinFamilyLog).send(`${this.client.ok} <@${newUser.id}> adlı üye ( ∞ ) tagını kullanıcı adına yerleştirerek aramıza katıldı! | **Sunucuda bulunan toplam taglı üyemiz: **(\`${tagsayı}\`)\n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` | Sonra ki kullanıcı adı: \`${newUser.tag}\``);
      }
    }
  }
  if (!newUser.username.includes(tag)) {
    let tagsayı = this.client.users.cache.filter(user => user.username.includes("∞")).size + 250
    if (s.roles.cache.get(this.client.config.roles.familyRole)) {
      if (!s.nickname) {
        await s.roles.remove(this.client.config.roles.familyRole, "Tagımızı Kaldırdı. Kullanıcı Adı güncellenemedi. ❌");
        this.client.channels.cache.get(this.client.config.channels.leaveFamilyLog).send(`${this.client.no} <@${newUser.id}> adlı üye ( ∞ ) tagını kullanıcı adından silerek aramızdan ayrıldı! | **Sunucuda bulunan toplam taglı üyemiz: **(\`${tagsayı}\`)\n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` | Sonra ki kullanıcı adı: \`${newUser.tag}\``);
      } else {
        await s.roles.remove(this.client.config.roles.familyRole, "Tagımızı Kaldırdı. Kullanıcı Adı güncellendi. ✔️");
        s.setNickname(s.nickname.replace("∞", "•"));
        this.client.channels.cache.get(this.client.config.channels.leaveFamilyLog).send(`${this.client.no} <@${newUser.id}> adlı üye ( ∞ ) tagını kullanıcı adından silerek aramızdan ayrıldı! | **Sunucuda bulunan toplam taglı üyemiz: **(\`${tagsayı}\`)\n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` | Sonra ki kullanıcı adı: \`${newUser.tag}\``);
      }

    let taggesRoles = [
     
    ] // Taglı Rolleri
    
    let authyRoles = [
     
    ] // Yetkili Rolleri
    
    let member = this.client.guilds.cache.get(this.client.config.guildID).members.cache.get(newUser.id)
    let filter = authyRoles.filter(a => member.roles.cache.has(a))
    if (filter.length > 0) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(`<@${newUser.id}> tag saldığı için aşağıdaki rolleri alındı:\n\n${filter.map(x => `<@&${x}>`).join("\n")}\n\n`)
        this.client.channels.cache.get(this.client.config.channels.authyLeaveLog).send({ embed: embed })
        this.client.users.cache.get(oldUser.id).send(`Selam ${oldUser.username}!\n\nGörünüşe göre yetkili ekibimizin bir parçası olarak bulunduğun halde sunucu tagımızı bırakmışsın. Bu sebepten ötürü yetkin otomatik olarak alındı ve bulunduğun yetkili sunucularından otomatik olarak çıkarıldın. Sunucu tagımızı önemsiyoruz ve yetkililerimizde bunu görmek istiyoruz.\n\nBizimle beraber çalıştığın için teşekkürler, seni yeniden aramızda görmekten mutluluk duyacağız. Herhangi bir sorununda veya yetki konusunu yeniden konuşmak için üst yönetim ekibimize yazmaktan çekinme. Seni seviyoruz, iyi ki varsın!\n\nTekrardan görüşmek dileğiyle ve sevgilerle,\n İnception Yönetim`)
        for (let i = 0; i < filter.length;i++) {
                    setTimeout(() => {
                        member.roles.remove(filter[i])
                    }, (i + 1) * 1000)
                }
    }
    
    let filteruser = taggesRoles.filter(a => member.roles.cache.has(a))
    if (filteruser.length > 0) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(`<@${newUser.id}> tag saldığı için aşağıdaki rolleri alındı:\n\n${filteruser.map(x => `<@&${x}>`).join("\n")}`)
        this.client.channels.cache.get(this.client.config.channels.authyLeaveLog).send({ embed: embed })
        for (let i = 0; i < filteruser.length;i++) {
                    setTimeout(() => {
                        member.roles.remove(filteruser[i])
                    }, (i + 1) * 1000)
                }
      }
    }
  }
    }
};

