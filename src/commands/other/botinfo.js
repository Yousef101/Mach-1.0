const { RichEmbed } = require("discord.js");

module.exports = { 
  config: {
    name: "botinfo",
    aliases: ["binfo"],
    usage: "_botinfo",
    description: "Get some stats on the bot",
    permissions: "none"
  },
  run: async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL; //bot avatar
    let botembed = new RichEmbed()
        .setDescription("Bot Information")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))   //hex color randomizer
        .setThumbnail(bicon)
        .addField("About", "Hello! I am Mach!, a fun/Mod bot that is easy to host yourself! (v1.5.0). **Type _help to view my commands**")
        .setTitle('Invite me to your server')
        .setURL('https://discordapp.com/oauth2/authorize?client_id=638764782031339521&scope=bot&permissions=805694679')
        .addField("Created On", bot.user.createdAt)
        .setTimestamp()
        .addField("Owned by", "SoreLucifer ⍱‿●#1205");
    message.channel.send(botembed);
  }
}