const { RichEmbed } = require("discord.js"); 
const errors = require("../../../utils/errors.js") //better errors
const usage = require("../../../utils/usage.js"); //better help-messages
const { prefix } = require("../../loaders/reader") //get prefix from botconfig

module.exports = {
    config: {
        name: "unmute",
        usage: "_unmute <user>",
        description: "If you've muted someone, unmute them with this command.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        let cmd = message.content.split(" ")[0].replace(prefix, ''); //because command aliases
        if(args[0] == "help") return message.channel.send(usage.fullHelp(bot, cmd));

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!mutee) return errors.cantfindUser(message.channel);
        

        let muterole = message.guild.roles.find(r => r.name === "muted")
        if(!muterole) return message.channel.send("There is no mute role to remove!") //if no role

        if(!mutee.roles.has(muterole.id)) return message.channel.send("That user is not muted to begin with!"); //if not muted
        mutee.removeRole(muterole.id); //remove role
        message.react("☑️")
        let unmuteEmbed = new RichEmbed()
        .setDescription(" :bell: **User Unmuted**")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))
        .addField("User", `${mutee} with ID ${mutee.id}`)
        
        let logchannel = message.guild.channels.find(x => x.name === "mod-logs");
        
        if(logchannel){
            logchannel.send(unmuteEmbed);
        }else return;
        
    }
}
