const Command = require("../base/Command.js");
const Discord = require("discord.js")
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require("discord-buttons");
class oyun extends Command {
    constructor(client) {
        super(client, {
            name: "oyun",
            aliases: ["oyun"]
        });
    }

    async run(message, args, client) {
        if(!this.client.config.botOwners.includes(message.author.id)) return


        const can = new MessageMenuOption()
        .setLabel('Among Us')
        .setEmoji('🔴')
        .setValue('amongus')
        .setDescription('Among Us')
  
        const can1 = new MessageMenuOption()
        .setLabel('League of Legends')
        .setEmoji('🟡')
        .setValue('lol')
        .setDescription('League of Legends')

        const can2 = new MessageMenuOption()
        .setLabel('Counter Strike')
        .setEmoji('🟢')
        .setValue('cs')
        .setDescription('Counter Strike')

        const can3 = new MessageMenuOption()
        .setLabel('Minecraft')
        .setEmoji('🔵')
        .setValue('minecraft')
        .setDescription('Minecraft')

        const can4 = new MessageMenuOption()
        .setLabel('Fortnite')
        .setEmoji('🟠')
        .setValue('fortnite')
        .setDescription('Fortnite')

        const can5 = new MessageMenuOption()
        .setLabel('Grand Theft Auto V')
        .setEmoji('🟣')
        .setValue('gta')
        .setDescription('Grand Theft Auto V')

        const can6 = new MessageMenuOption()
        .setLabel('Rust')
        .setEmoji('🟣')
        .setValue('rust')
        .setDescription('Rust')
        
    const select = new MessageMenu()
        .setID('select1')
        .setPlaceholder('Oyun rollerinizi seçin')
        .addOption(can)
        .addOption(can1)
        .addOption(can2)
        .addOption(can3)
        .addOption(can4)
        .addOption(can5)
        .addOption(can6)
  
  
     const Row1 = new MessageActionRow()
     .addComponent(select)   
    
    await message.channel.send('Oyun rollerini seç', { components: [Row1] });
}

}
module.exports = oyun;
