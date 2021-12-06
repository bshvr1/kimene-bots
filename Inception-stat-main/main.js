const {
  MessageEmbed
} = require("discord.js");
const Discord = require('discord.js');
const client = global.client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const kimene = require("pretty-ms");
moment.locale("tr");
let mainSettings = require(__dirname + "/../settings.js");
let mongoose = require("mongoose");
mongoose.connect(mainSettings.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const sunucuayar = require('./models/sunucuayar');
let randMiss = require("./models/randomMission");
let easyMiss = require("./models/easyMission");
let puansystem = require("./models/puansystem");
client.db = require("./models/özelperm");
let stats = require("./models/stats");
let xpData = require("./models/stafxp");
require('./util/eventLoader')(client);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(__dirname + '/komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir(__dirname + "/komutlar/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./komutlar/${f}/` + file);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      })
    })
  });
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-.]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.ayarlar = {
	"prefix": mainSettings.prefix,
	"botSesID": mainSettings.botSesID,
	"sunucuId": mainSettings.sunucuId,
	"sahip": mainSettings.sahip,
	"commandChannel": mainSettings.commandChannel,
	
	"CHAT_KANAL": mainSettings.CHAT_KANAL,
	"PUBLIC_KATEGORI": mainSettings.PUBLIC_KATEGORI,
	"STREAMER_KATEGORI":mainSettings.STREAMER_KATEGORI,
	"REGISTER_KATEGORI": mainSettings.REGISTER_KATEGORI,
	"SLEEP_ROOM": mainSettings.SLEEP_ROOM,
	
	"footer": mainSettings.footer,
	"onsekizatilacakoda": mainSettings.onsekizatilacakoda,
	"onsekizodalar": mainSettings.onsekizodalar,
	"readyFooter": mainSettings.readyFooter,
	"chatMesajı": mainSettings.chatMesajı,
	"YETKI_VER_LOG": mainSettings.YETKI_VER_LOG,
	"CEZA_PUAN_KANAL": mainSettings.CEZA_PUAN_KANAL,
	"taglogkanal": mainSettings.TAG_SYSTEM_CHANNEL,
	"CEZA_PUAN_SYSTEM": mainSettings.CEZA_PUAN_SYSTEM
}
const ayarlar = client.ayarlar
global.ayarlar = ayarlar;

client.login(mainSettings.STATS).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));
client.emoji = function (x) {
  return client.emojis.cache.find(x => x.name === client.emojiler[x]);
};

client.channelTime = new Map();

client.yolla = async (mesaj, msg, kanal) => {
  if (!mesaj || !String(mesaj)) return
  const embd = new Discord.MessageEmbed()
    .setAuthor(msg.tag, msg.displayAvatarURL({
      dynamic: true
    }))
  .setFooter("Kimene ❤️ Owsla ")
    .setColor("RANDOM")
    .setDescription(mesaj)
  kanal.send(embd)
    .catch(console.error);
}

client.turkishDate = async (date) => {
  if (!date || typeof date !== "number") return
  let convert = kimene(date, {
      verbose: true
    })
    .replace("minutes", "dakika")
    .replace("minute", "dakika")
    .replace("hours", "saat")
    .replace("hour", "saat")
    .replace("seconds", "saniye")
    .replace("second", "saniye")
    .replace("days", "gün")
    .replace("day", "gün")
    .replace("years", "yıl")
    .replace("year", "yıl");
  return convert
}

const emoji = global.emoji;

const sayiEmojiler = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: ""
};

client.emojiSayi = function (sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};


global.emoji = client.emoji = function (x) {
  return client.emojis.cache.find(x => x.name === client.emojiler[x]);
};

client.sayilariCevir = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


client.renk = {
  //"renksiz": "2F3136", // 0x36393E
  "mor": "#3c0149",
  "mavi": "#10033d",
  "turkuaz": "#00ffcb",
  "kirmizi": "#750b0c",
  "yesil": "#032221" // 00cd00 - 008b00
};

client.randomColor = function () {
  return client.renk[Object.keys(client.renk).random()];
};


client.splitEmbedWithDesc = async function (description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0]) + 1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i * 2048, (i + 1) * 2048)
    let x = new MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize - 1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize - 1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if (value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};


client.convertDuration = (date) => {
  return moment.duration(date).format('H [saat,] m [dk.]');
};

client.wait = async function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
};

Array.prototype.temizle = function () {
  let yeni = [];
  for (let i of this) {
    if (!yeni.includes(i)) yeni.push(i);
  }
  return yeni;
};

client.savePunishment = async () => {
  sunucuayar.findOne({}, async (err, res) => {
    if (!res) return
    res.WARNID = res.WARNID + 1
    res.save().catch(e => console.log(e))
  })
}

client.Embed = async (kanal, message) => {

  let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(message)
  .setFooter("Kimene ❤️ Owsla")
  client.channels.cache.get(kanal).send(embed).then(x => x.delete({
    timeout: 5000
  }))
  return embed
}


client.dailyMission = async function (userID, type, value) {
    randMiss.findOne({
      userID: userID
    }, async (err, data) => {
      if (!data) return;
      if (data.Mission.MISSION == type) {
        data.Check += value;
        data.save()
      }
    })
}
client.easyMission = async function(userID, type, value) {
  easyMiss.findOne({userID: userID}, async (err, data) => {
    if (!data) return;
    if (data.Mission.Type == type) {
      data.Check+=value;data.save()
    }
  })
}


let arr = [{
  Chat: "💬🥉",
  Voice: "🔊🥉",
  ChatColor: "#fa795b",
  VoiceColor: "#fa795b",
  sLevel: 3,
  cLevel: 2
}, {
  Chat: "💬🥈",
  Voice: "🔊🥈",
  ChatColor: "#cfcbcb",
  VoiceColor: "#cfcbcb",
  sLevel: 8,
  cLevel: 5
}, {
  Chat: "💬🥇",
  Voice: "🔊🥇",
  ChatColor: "#fffb00",
  VoiceColor: "#fffb00",
  sLevel: 20,
  cLevel: 35
}, {
  Chat: "💬🏆",
  Voice: "🔊🏆",
  ChatColor: "#23fafa",
  VoiceColor: "#23fafa",
  sLevel: 50,
  cLevel: 70
}]
client.checkLevel = async function (userID, guildID, type) {
  let levelKontrol = await puansystem.findOne({guildID: guildID}) || {LevelSystem: {Type: false, LogChannel: null}};
  if (levelKontrol.LevelSystem.Type == false) return;
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  let kontrol = await stats.findOne({
    userID: userID,
    guildID: guildID
  });
  if (!kontrol) return;
  arr.map(async data => {
    if (type === "mesaj") {
      if (kontrol.messageLevel >= data.cLevel) {
        if (kontrol.autoRankup.includes(data.Chat)) return;
        stats.updateOne({userID: userID, guildID: guildID}, {$push: {autoRankup: data.Chat}}, {upsert: true}).exec()
        client.channels.cache.get(levelKontrol.LevelSystem.LogChannel).send(`:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${data.Chat}"** rolüne terfi edildin!`)
      };
    };
    if (type === "ses") {
      if (kontrol.voiceLevel >= data.sLevel) {
        if (kontrol.autoRankup.includes(data.Voice)) return;
        stats.updateOne({userID: userID, guildID: guildID}, {$push: {autoRankup: data.Voice}}, {upsert: true}).exec()
        client.channels.cache.get(levelKontrol.LevelSystem.LogChannel).send(`:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${data.Voice}"** rolüne terfi edildin!`)
      };
    };
  });
};
