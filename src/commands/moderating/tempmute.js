const { RichEmbed } = require("discord.js"); 
const errors = require("../../../utils/errors.js"); //better errors
const usage = require("../../../utils/usage.js"); //better help-messages
const { prefix } = require("../../loaders/reader") //get prefix from botconfig
 
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    config: {
        name: "tempmute",
        aliases: ["nospeak"],
        usage: "_tempmute <user> <reason>",
        description: "Stop someone from talking if they're spamming, etc.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        
 let logsChannel = message.guild.channels.find(`name`, "mod-logs");
  let tmUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let mTime = args[1];
  let tmuteRole = message.guild.roles.find(`name`, "muted");

  if(!tmuteRole){
    try{
      tmuteRole = await message.guild.createRole({
        name: "muted",
        color: "#636262",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(tmuteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let permsEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":x: You don't have permission for this command.", "You must have the **BAN_MEMBERS** permission to use this command.")
  ;

  let noUserEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":x: You didn't specify a user.", "Please specify the user you want to tempmute.")
  ;

  let badUserEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":x: You can't tempmute this user.", "This user's permissions are too high to be tempmuted.")
  ;

  let noTimeEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":x: You didn't specify a time.", "Please specify the time you want to tempmute the user for.");

  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(permsEmbed);
  if(!tmUser) return message.channel.send(noUserEmbed);
  if(tmUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(badUserEmbed);
  if(!mTime) return message.channel.send(noTimeEmbed);

  let tMuteEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":white_check_mark: Success!", `${tmUser} has been muted for **${mTime}**.`)
  ;

  let tMuteExpiredEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":bell: Alert", `${tmUser}'s tempmute has expired.`)
  .addField("Username", tmUser, true)
  .addField("User ID", tmUser.id, true)
  .addField("Length", mTime, true)
  ;

  let logsEmbed = new Discord.RichEmbed()
  .setColor("#"+((1<<24)*Math.random()|0).toString(16))
  .addField(":bell: Alert", `${message.author.username} has tempmuted a member.`)
  .addField("Username", tmUser, true)
  .addField("User ID", tmUser.id, true)
  .addField("Length", mTime, true)
  .addField("Time", message.createdAt, true)
  ;

  await(tmUser.addRole(tmuteRole.id));
  message.react("🤐");
  logsChannel.send(logsEmbed);

  setTimeout(function(){
    if(!tmUser.roles.has(tmuteRole.id))return;
    tmUser.removeRole(tmuteRole.id);
    logsChannel.send(tMuteExpiredEmbed);
  }, ms(mTime));

        
    }
}
