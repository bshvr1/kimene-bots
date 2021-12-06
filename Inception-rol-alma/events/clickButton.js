
module.exports = class {
    constructor(client) {
        this.client = client;
    }
  
    async run(button) {
    
      if (button.id === 'Etkinlik') {
        await button.reply.think(true);
        if (button.clicker.member.roles.cache.get(this.client.config.event.Etkinlik)) {
          await button.clicker.member.roles.remove(this.client.config.event.Etkinlik);
          await button.reply.edit("Etkinlik Katılımcısı rolü üzerinizden alındı. Artık etkinliklerden bildirim almayacaksınız.")
      } else {
          await button.clicker.member.roles.add(this.client.config.event.Etkinlik);
          await button.reply.edit("Etkinlik Katılımcısı rolü üzerinize verildi. Artık etkinliklerimizden haberdar olacaksınız.")
      }   
      }
      if (button.id === 'Çekiliş') {
        await button.reply.think(true);
        if (button.clicker.member.roles.cache.get(this.client.config.event.Cekilis)) {
          await button.clicker.member.roles.remove(this.client.config.event.Cekilis);
          await button.reply.edit("Cekiliş Katılımcısı rolü üzerinizden alındı. Artık çekilişlerden bildirim almayacaksınız.")
      } else {
          await button.clicker.member.roles.add(this.client.config.event.Cekilis);
          await button.reply.edit("Cekiliş Katılımcısı rolü üzerinize verildi. Artık çekilişlerimizden haberdar olacaksınız.")
      }   
      }
      
    
        }
      }
    