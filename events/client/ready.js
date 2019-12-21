const config = require("../../src/loaders/reader"); 
//get the data set in the botconfig file
const logger = require("../../utils/logger");
//if you have not already seen logger.js, this is basically the same as console logging, yet neater.
const configchecker = require("../../utils/configchecker");
//used to check certain elements of the data set in the botconfig file

const Discord = require("discord.js");
const { RichEmbed } = require("discord.js"); 

module.exports = async bot => {
    bot.user.client.user.setStatus('online', 'Made by WonderTab') 
    bot.user.client.user.setPresence({ game: { name: 'Moderating | _help' } });
    
    logger.info("Bot is online!");
    
    bot.on('guildMemberAdd', member => {

        var role = member.guild.roles.find(x => x.name === "Member");
        if(role){
          member.addRole(role);
        }else return;
          
         
      }
      
      );

       
bot.on('message', message =>{
   
    let invEmbed = new RichEmbed()
          .setDescription(" :bell: **User posted an invite**")
          .setColor("#"+((1<<24)*Math.random()|0).toString(16))
          .addField(`User: ${message.author.username}`, `With ID ${message.author.id}`)
          .addField(`Channel: ${message.channel.name}`, `SHAME`);
  
    if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) { //if it contains an invite link
      if (message.member.hasPermission("ADMINISTRATOR")) {return;} else {
        message.delete() //delete the message
          .then(message.reply("**Ayyy! Discord invites are not allowed in this server**"))
      }
  
      
      
        let logchannel = message.guild.channels.find(x => x.name === "mod-logs");
          
        if(logchannel){
            logchannel.send(invEmbed);
        }else return; 
    }
  
     
  });


    configchecker.checkPrivate(bot, config); 
    configchecker.checkWhitelist(bot, config);
    //check that if whitelist/private is toggled, correct data has been filled out in the botconfig file
    require("../../src/loaders/pluginloader")(bot, config); //run pluginloader.js
    bot.registerCommandAlias = function (alias, command) {
        bot.aliases.set(alias, command);
    }
    bot.execute = function (command, bot, message, args) {
        let commandfile = bot.commands.get(command) || bot.aliases.get(bot.commands.get(command));
        commandfile.run(bot, message, args);
    }
}