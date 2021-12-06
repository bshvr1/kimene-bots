module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    await this.client.wait(1000);
    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);
    this.client.user.setActivity("Can ❤️ Can.");
    const guild = this.client.guilds.cache.get(this.client.config.guildID);
		if(guild) {
			await guild.members.fetch();
			console.log(`${guild.name} Üyeleri fetchlendi`)
		}
    let botVoiceChannel = this.client.channels.cache.get(this.client.config.botVoiceChannel);
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
    this.client.logger.log(`${this.client.user.tag}, kullanıma hazır ${this.client.users.cache.size} kullanıcı, ${this.client.guilds.cache.size} sunucu.`, "ready");
    }
};
