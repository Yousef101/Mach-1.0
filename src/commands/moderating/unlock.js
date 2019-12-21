const errors = require("../../../utils/errors.js"); //better errors
const { RichEmbed } = require("discord.js"); 

module.exports = {
    config: {
        name: "unlock",
        usage: "_unlock",
        description: "Unlocks the channel its used in",
        permissions: "administrator"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
        
        let cmd = message.content.split(" ")[0]; //because command aliases
        if (args[0] == "help") return message.channel.send(`Usage: ${cmd}`);
        
        await message.channel.overwritePermissions(message.guild.defaultRole, {
            SEND_MESSAGES: true
          });
          return message.react("🔓");
          
        }
        
        

    }
