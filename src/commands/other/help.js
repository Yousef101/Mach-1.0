const { RichEmbed } = require("discord.js");
const { prefix, purple } = require("../../loaders/reader"); //get prefix/purple elements from finalConfig in reader.js
const gethelp = require("../../../utils/usage.js"); //better help-messages

module.exports = {
    config: {
        name: "help",
        aliases: ["halp", "commands"],
        usage: "_help",
        description: "Get some information on a specific command",
        permissions: "none"
    },
    
    run: async (bot, message, args) => {
        message.react("❤️");
        if(args[0]) {
            let command = args[0];
            let embed = gethelp.fullHelp(bot, command);
            return message.channel.send(embed);
        } else {
            let Sembed = new RichEmbed()
                .setColor("#0d0d0d")
                .setAuthor(`Help:`)
                .setThumbnail(bot.user.displayAvatarURL) //bot avatar
                .setDescription(`The bot prefix is ${prefix} \n **Note**: Most of these commands will only work in a server. \n These are the bot's commands: `)
                .addField(`Commands:`,`${prefix}help <command>`)
                .addField(`Fun:`, " ``8ball`` ``coinflip`` ``meme`` ``cat`` ``dog`` ")
                .addField(`Moderation:`, " ``addrole`` ``removerole`` ``lock`` ``unlock`` ``poll`` ``say`` ``kick`` ``ban`` ``mute`` ``tempmute`` ``unmute`` ``warn`` ``nick`` ``purge``  ")
                .addField(`Other:`, "``av`` ``whois`` ``botinfo`` ``serverinfo`` ``ping`` ``uptime`` ``urban`` ")
                .addField("For further assistance contact:", "SoreLucifer ⍱‿●#1205")
                .setTimestamp();
                
                
            message.author.send(Sembed);
        }
    } 
}