require("./error"); //this file checks that all modules are installed, etc.
const logger = require("../utils/logger"); //better console logging
const { Client, Collection } = require("discord.js");
const bot = new Client(); //creates the Discord Client
const data = require("./loaders/reader"); //this returns data user entered in botconfig file
const { Attachment } = require('discord.js');
const Discord = require("discord.js");
const { RichEmbed } = require("discord.js"); 
const ms = require('ms');

["aliases", "commands"].forEach(x => bot[x] = new Collection()); //bot.aliases, bot.commands = Discord Collections
["console", "command", "event"].forEach(x => require(`../handlers/${x}`)(bot)); //run all of these files with param bot


logger.log("Successfully loaded other files.");







    



bot.login(data.token); //login with the bot token defined in botconfig file


  
  








