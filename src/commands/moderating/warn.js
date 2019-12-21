const errors = require("../../../utils/errors.js"); //better errors
const { RichEmbed } = require("discord.js"); 

module.exports = {
    config: {
        name: "warn",
        usage: "_warn <user> <reason>",
        description: "Somebody misbehaving? Try warning them",
        permissions: "administrator"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
        
        let cmd = message.content.split(" ")[0]; //because command aliases
        if (args[0] == "help") return message.channel.send(`Usage: ${cmd} <user> <reason>`);

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send("User not found.");

        if (mutee.id === bot.user.id) return errors.botuser(message, "warn");

        let reason = args.join(" ").slice(22);
        if (!reason) reason = "No reason was given."

        if(mutee.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.equalPerms(message, mutee, "KICK_MEMBERS");

        message.react("🚨");
        mutee.send(`You were warned in ${message.guild.name} for ${reason}`).catch(() => {
            return message.channel.send(":x: That user has their dm's blocked");
        });
        let warnEmbed = new RichEmbed()
        .setDescription(" :bell: **User Warned**")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))
        .addField("Warned User", `${mutee} with ID ${mutee.id}`)
        .addField("Warned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Reason", `${reason}`)
        
        let logchannel = message.guild.channels.find(x => x.name === "mod-logs");
        
        if(logchannel){
            logchannel.send(warnEmbed);
        }else return;
        
        
            
        
        
        
    

    }
}