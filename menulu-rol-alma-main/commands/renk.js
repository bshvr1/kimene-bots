const Command = require("../base/Command.js");
const Discord = require("discord.js")
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require("discord-buttons");
class renk extends Command {
    constructor(client) {
        super(client, {
            name: "renk",
            aliases: ["renk"]
        });
    }

    async run(message, args, client) {

        if(!this.client.config.botOwners.includes(message.author.id)) return

        const can = new MessageMenuOption()
        .setLabel('Kırmızı')
        .setEmoji('🔴')
        .setValue('red')
        .setDescription('Kırmızı')
  
        const can1 = new MessageMenuOption()
        .setLabel('Sarı')
        .setEmoji('🟡')
        .setValue('yellow')
        .setDescription('Sarı')

        const can2 = new MessageMenuOption()
        .setLabel('Yeşil')
        .setEmoji('🟢')
        .setValue('green')
        .setDescription('Yeşil')

        const can3 = new MessageMenuOption()
        .setLabel('Mavi')
        .setEmoji('🔵')
        .setValue('blue')
        .setDescription('Mavi')

        const can4 = new MessageMenuOption()
        .setLabel('Turuncu')
        .setEmoji('🟠')
        .setValue('orange')
        .setDescription('Turuncu')

        const can5 = new MessageMenuOption()
        .setLabel('Mor')
        .setEmoji('🟣')
        .setValue('purple')
        .setDescription('Mor')
        
    const select = new MessageMenu()
        .setID('select1')
        .setPlaceholder('Renk rolünüzü seçin')
        .addOption(can)
        .addOption(can1)
        .addOption(can2)
        .addOption(can3)
        .addOption(can4)
        .addOption(can5)
  
  
     const Row1 = new MessageActionRow()
     .addComponent(select)   
    
    await message.channel.send('Taglılara özel renk rollerimiz', { components: [Row1] });
}

}
module.exports = renk;
