const { inspect } = require("util");
const { ownerid } = require("../../loaders/reader"); //get ownerid from botconfig file

module.exports = {
    config: {
        name: "setstatus",
        aliases: ["status"],
        usage: "_setstatus",
        description: "Changes the status of the bot!",
        permissions: "Bot Owner!"
    },
    run: async (bot, message, args) => {
    
        const setStatus = message.content.split(' ');

        if (message.author.id != ownerid) return; //only owner can use

    else if(setStatus[1] === 'idle'){
        bot.user.setStatus('idle')
            .then(message.channel.send("My status has been set to: "+setStatus[1]))
            .catch(console.error);
    } 

    else if(setStatus[1] === 'online'){
        bot.user.setStatus('online')
            .then(message.channel.send("My status has been set to: "+ setStatus[1]))
            .catch(console.error);
    }

    else if(setStatus[1] === 'invisible'){
        bot.user.setStatus('invisible')
            .then(message.channel.send("My status has been set to: "+ setStatus[1]))
            .catch(console.error);
    }

    else if(setStatus[1] === 'dnd'){
        bot.user.setStatus('dnd')
            .then(message.channel.send("My status has been set to: "+ setStatus[1] + "(do not disturb)"))
            .catch(console.error);
    }

    else{
        return message.channel.send("I could not set my status please type one of the following status: ``idle``, ``online``, ``invisible``,``dnd``");
    }
        

    }
}