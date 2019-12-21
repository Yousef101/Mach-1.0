const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    name:"serverinfo",
    aliases: ["serverdesc"],
    usage: "_serverinfo",
    description: "Get some information on the server you're in!",
    permissions: "none" 
  },
  run: async (bot, message, args) => {
    if (message.channel.type == "dm") return;

    let sicon = message.guild.iconURL; //server image

    let serverembed = new RichEmbed()
      .setDescription("Server Information")
      .setColor("#"+((1<<24)*Math.random()|0).toString(16)) //hex color randomizer
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("Roles", message.guild.roles.size, true)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .setTimestamp()
      .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true);
    message.channel.send(serverembed);
  }
}