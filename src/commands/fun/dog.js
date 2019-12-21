const superagent = require("superagent");

module.exports = {
    config: {
        name: "dog",
        aliases: ["woof", "bark", "doge"],
        usage: "_dog",
        description: "Get a cute image of a dog",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        let msg = await message.channel.send(". . . Generating . . .");

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`);
        if(!{body}) return message.channel.send("Unfortunately, an error occurred - try running the command again.");

        await message.channel.send({ //await sending message
            files: [{
                attachment: body.message,
                name: "dog.png"
            }]
        }).then(() => msg.delete()); //after message sent delete ...generating... message
    }
}