const Discord = require('discord.js');
let days = 0;
let week = 0;

module.exports = {
    config: {
        name: "uptime",
        aliases: ["buptime"],
        usage: "_uptime",
        description: "Shows for how long the bot has been online!",
        permissions: "None"
    },
    run: async (bot, message, args) => {
        let uptime = ``;
        let totalSeconds = (bot.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
    
        if(hours > 23){
            days = days + 1;
            hours = 0;
        }
    
        if(days == 7){
            days = 0;
            week = week + 1;
        }
    
        if(week > 0){
            uptime += `${week} week, `;
        }
    
        if(minutes > 60){
            minutes = 0;
        }
    
        uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    
        let serverembed = new Discord.RichEmbed()
            .setColor("#228B22")
            .addField('Uptime', uptime);
    
        message.channel.send(serverembed);
    }
}