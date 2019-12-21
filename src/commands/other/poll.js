const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "poll",
        aliases: ["simple poll"],
        usage: "_poll",
        description: "Creates a simple poll!",
        permissions: "ADMINISTRATOR"
    },
    run: async (bot, message, args) => {
         
  if (!message.member.hasPermission('ADMINISTRATOR')) return;
  
  
  if (!args[0]) return message.channel.send('What is the question?');
  
  
  const embed = new RichEmbed()
  .setColor('#00fffbb')
  .setFooter('React to Vote')
  .setDescription(args.join(' '))
  .setTitle(`${message.author.username} started a vote!`);
  
  let msg = await message.channel.send(embed);
  
  await msg.react('✅');
  await msg.react('❌');
  
  // message.delete({timeout: 1000});
  
  

    
    }
}