const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "whois",
        aliases: ["info"],
        usage: "_whois <user>",
        description: "Shows user information!",
        permissions: "None"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        let memberToFind = message.mentions.members.first(); //Checks for a mentioned user (@eSkuzi#0001)
        let member = message.mentions.members.first() || message.member,
        user = member.user;
        
        if (!memberToFind) { //If no member is mentioned, throw this error
            
            return message.channel.send('You must mention a member for this command'); //Send message and stop executing code
        }
 
        let embed = new Discord.RichEmbed()
            .setAuthor(memberToFind.user.tag, memberToFind.user.avatarURL) //This will show the users tag and avatar - there was no need to stringify that text :P
            .addField('Account Created', memberToFind.user.createdAt) //Shows when the user was registered
            //.addField('Joined this Server', message.guild.members.find('id', memberToFind.id).joinedAt, true) //Shows when the user joined the guild
            .addField('User ID', memberToFind.id, true) //Shows the user ID
            .addField('Roles:', member.roles.map(r => `${r}`).join(' | '), true)
            .setColor(0xffffff) //Make the embed white
            .setFooter('Searched User') //Add a footer
            .setTimestamp() //Timestamp the footer
            
 
        message.channel.send(embed); //Send the embed we just created
    }
}
 

    
    
