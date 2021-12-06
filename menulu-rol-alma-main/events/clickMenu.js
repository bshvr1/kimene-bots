

module.exports = class {
    constructor(client) {
        this.client = client;
    }
  
    async run(menu) {
        const member = menu.clicker.member

        if(menu.values[0] == 'lovers') {
          if(!member.roles.cache.has(this.client.config.event.lovers)) {
            await member.roles.add(this.client.config.event.lovers)
            await member.roles.remove(this.client.config.event.unlovers)
            return menu.reply.send('Sevgilim Var rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.lovers)) {
            await member.roles.remove(this.client.config.event.lovers)
            return menu.reply.send("Sevgilim Var Rolü Üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'unlovers') {
          if(!member.roles.cache.has(this.client.config.event.unlovers)) {
            await member.roles.add(this.client.config.event.unlovers)
            await member.roles.remove(this.client.config.event.lovers)
            return menu.reply.send('Sevgilim Yok rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.unlovers)) {
            await member.roles.remove(this.client.config.event.unlovers)
            return menu.reply.send("Sevgilim Yok rolü üzerinizden alındı.", true)
          }
          
        }

        if(menu.values[0] == 'norole') {
          if(!member.roles.cache.has(this.client.config.event.unlovers && this.client.config.event.lovers)) {
            await member.roles.remove(this.client.config.event.unlovers)
            await member.roles.remove(this.client.config.event.lovers)
            return menu.reply.send('İlişki rolü üzerinizden alındı.', true)
          } 
        }
      
         
        if(menu.values[0] == 'vk') {
          if(!member.roles.cache.has(this.client.config.event.Vampirkoylu)) {
            await member.roles.add(this.client.config.event.Vampirkoylu)
            return menu.reply.send('Vampir Köylü rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Vampirkoylu)) {
            await member.roles.remove(this.client.config.event.Vampirkoylu)
            return menu.reply.send("Vampir Köylü rolü üzerinizden alındı.", true)
      
          }
        }
        if(menu.values[0] == 'sc') {
          if(!member.roles.cache.has(this.client.config.event.SoruCevap)) {
            await member.roles.add(this.client.config.event.SoruCevap)
            return menu.reply.send('Soru - Cevap rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.SoruCevap)) {
            await member.roles.remove(this.client.config.event.SoruCevap)
            return menu.reply.send("Soru - Cevap rolü üzerinizden alındı.", true)
          }
        }
        if(menu.values[0] == 'gc') {
          if(!member.roles.cache.has(this.client.config.event.Gartic)) {
            await member.roles.add(this.client.config.event.Gartic)
            return menu.reply.send('Gartic.io rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Gartic)) {
            await member.roles.remove(this.client.config.event.Gartic)
            return menu.reply.send("Gartic.io rolü üzerinizden alındı.", true)
          }
        }
      
        let redd = [this.client.config.event.Yellow, this.client.config.event.Green, this.client.config.event.Blue, this.client.config.event.Orange, this.client.config.event.Purple]
      
        if(menu.values[0] == 'red') {
            if(!member.roles.cache.has(this.client.config.event.Red)) {
                await member.roles.remove(redd)
                await member.roles.add(this.client.config.event.Red)
              return menu.reply.send('Kırmızı rolü üzerinize verildi.', true)
            } else if(member.roles.cache.has(this.client.config.event.Red)) {
              await member.roles.remove(this.client.config.event.Red)
              return menu.reply.send("Kırmızı rolü üzerinizden alındı.", true)
            }
          }
        
        let yelloww = [this.client.config.event.Red, this.client.config.event.Green, this.client.config.event.Blue, this.client.config.event.Orange, this.client.config.event.Purple]
      
        if(menu.values[0] == 'yellow') {
          if (!menu.clicker.member.roles.cache.some(r => this.client.config.roles.familyRole.includes(r.id))) return menu.reply.send("Sadece tagımıza sahip olan üyelerimiz seçebilir", true)
          if(!member.roles.cache.has(this.client.config.event.Yellow)) {
            await member.roles.remove(yelloww)
            await member.roles.add(this.client.config.event.Yellow)
        
            return menu.reply.send('Sarı rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Yelow)) {
            await member.roles.remove(this.client.config.event.Yellow)
            return menu.reply.send("Sarı rolü üzerinizden alındı.", true)
          }
        }
      
        let greenn = [this.client.config.event.Red, this.client.config.event.Yellow, this.client.config.event.Blue, this.client.config.event.Orange, this.client.config.event.Purple]
      
        if(menu.values[0] == 'green') {
          if (!menu.clicker.member.roles.cache.some(r => this.client.config.roles.familyRole.includes(r.id))) return menu.reply.send("Sadece tagımıza sahip olan üyelerimiz seçebilir", true)
          if(!member.roles.cache.has(this.client.config.event.Green)) {
            await member.roles.remove(greenn)
            await member.roles.add(this.client.config.event.Green)
       
            return menu.reply.send('Yeşil rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Green)) {
            await member.roles.remove(this.client.config.event.Green)
            return menu.reply.send("Yeşil rolü üzerinizden alındı.", true)
          }
        }
      
        let bluee = [this.client.config.event.Red, this.client.config.event.Yellow, this.client.config.event.Green, this.client.config.event.Orange, this.client.config.event.Purple]
      
        if(menu.values[0] == 'blue') {
          if (!menu.clicker.member.roles.cache.some(r => this.client.config.roles.familyRole.includes(r.id))) return menu.reply.send("Sadece tagımıza sahip olan üyelerimiz seçebilir", true)
          if(!member.roles.cache.has(this.client.config.event.Blue)) {
            await member.roles.remove(bluee)
            await member.roles.add(this.client.config.event.Blue)
      
            return menu.reply.send('Mavi rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Blue)) {
            await member.roles.remove(this.client.config.event.Blue)
            return menu.reply.send("Mavi rolü üzerinizden alındı.", true)
          }
        }
      
        let orangee = [this.client.config.event.Red, this.client.config.event.Yellow, this.client.config.event.Green, this.client.config.event.Blue, this.client.config.event.Purple]
      
        if(menu.values[0] == 'orange') {
          if (!menu.clicker.member.roles.cache.some(r => this.client.config.roles.familyRole.includes(r.id))) return menu.reply.send("Sadece tagımıza sahip olan üyelerimiz seçebilir", true)
          if(!member.roles.cache.has(this.client.config.event.Orange)) {
            await member.roles.remove(orangee)
            await member.roles.add(this.client.config.event.Orange)
      
            return menu.reply.send('Turuncu rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Orange)) {
            await member.roles.remove(this.client.config.event.Orange)
            return menu.reply.send("Turuncu rolü üzerinizden alındı.", true)
          }
        }
      
        let purplee = [this.client.config.event.Red, this.client.config.event.Yellow, this.client.config.event.Green, this.client.config.event.Blue, this.client.config.event.Orange]
      
        if(menu.values[0] == 'purple') {
          if (!menu.clicker.member.roles.cache.some(r => this.client.config.roles.familyRole.includes(r.id))) return menu.reply.send("Sadece tagımıza sahip olan üyelerimiz seçebilir", true)
          if(!member.roles.cache.has(this.client.config.event.Purple)) {
            await member.roles.remove(purplee)
            await member.roles.add(this.client.config.event.Purple)
        
            return menu.reply.send('Mor rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Purple)) {
            await member.roles.remove(this.client.config.event.Purple)
            return menu.reply.send("Mor rolü üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'amongus') {
          if(!member.roles.cache.has(this.client.config.event.AmongUs)) {
            await member.roles.add(this.client.config.event.AmongUs)
        
            return menu.reply.send('Among Us rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.AmongUs)) {
            await member.roles.remove(this.client.config.event.AmongUs)
            return menu.reply.send("Among Us rolü üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'lol') {
          if(!member.roles.cache.has(this.client.config.event.Lol)) {
            await member.roles.add(this.client.config.event.Lol)
        
            return menu.reply.send('League of Legends rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Lol)) {
            await member.roles.remove(this.client.config.event.Lol)
            return menu.reply.send("Mor rolü üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'valo') {
          if(!member.roles.cache.has(this.client.config.event.Valorant)) {
            await member.roles.add(this.client.config.event.Valorant)
        
            return menu.reply.send('Valorant rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Valorant)) {
            await member.roles.remove(this.client.config.event.Valorant)
            return menu.reply.send("Valorant rolü üzerinizden alındı.", true)
          }
        }
      
        
        if(menu.values[0] == 'cs') {
          if(!member.roles.cache.has(this.client.config.event.CSGO)) {
            await member.roles.add(this.client.config.event.CSGO)
        
            return menu.reply.send('CS:GO rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.CSGO)) {
            await member.roles.remove(this.client.config.event.CSGO)
            return menu.reply.send("CS:GO rolü üzerinizden alındı.", true)
          }
        }
      
        
        if(menu.values[0] == 'minecraft') {
          if(!member.roles.cache.has(this.client.config.event.Minecraft)) {
            await member.roles.add(this.client.config.event.Minecraft)
        
            return menu.reply.send('Minecraft rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Minecraft)) {
            await member.roles.remove(this.client.config.event.Minecraft)
            return menu.reply.send("Minecraft rolü üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'fortnite') {
          if(!member.roles.cache.has(this.client.config.event.Fortnite)) {
            await member.roles.add(this.client.config.event.Fortnite)
        
            return menu.reply.send('Fortnite rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Fortnite)) {
            await member.roles.remove(this.client.config.event.Fortnite)
            return menu.reply.send("Fortnite rolü üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'gta') {
          if(!member.roles.cache.has(this.client.config.event.GtaV)) {
            await member.roles.add(this.client.config.event.GtaV)
        
            return menu.reply.send('Gta V rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.GtaV)) {
            await member.roles.remove(this.client.config.event.GtaV)
            return menu.reply.send("Gta V rolü üzerinizden alındı.", true)
          }
        }
      
        if(menu.values[0] == 'rust') {
          if(!member.roles.cache.has(this.client.config.event.Rust)) {
            await member.roles.add(this.client.config.event.Rust)
        
            return menu.reply.send('Rust rolü üzerinize verildi.', true)
          } else if(member.roles.cache.has(this.client.config.event.Rust)) {
            await member.roles.remove(this.client.config.event.Rust)
            return menu.reply.send("Rust rolü üzerinizden alındı.", true)
          }
        }
    }
        
      
      
      
    }