const Discord = require("discord.js");
const { RichEmbed } = require("discord.js"); 
module.exports = {
    config: {
        name: "av",
        aliases: ["avatar"],
        usage: "_av <user>",
        description: "returns avatar pic!",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        const myavatarEmbed = new Discord.RichEmbed()
          .setColor("0xDC143C")
          .setTitle("Your avatar...")
          .setImage(message.author.avatarURL)
          .setTimestamp();
        if (!message.mentions.users.size) {
          return message.channel.send(myavatarEmbed);
        }
        var user = message.mentions.users.first();
        const avatarEmbed = new Discord.RichEmbed()
          .setColor("0xDC143C")
          .setTitle(`${user.username}'s avatar...`)
          .setImage(user.displayAvatarURL)
          .setTimestamp();
        message.channel.send(avatarEmbed);
      }
    }
