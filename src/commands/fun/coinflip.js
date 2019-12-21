var flipcoin = ["heads", "tails"];

module.exports = {
    config: {
        name: "coinflip",
        usage: "_coinflip",
        description: "Flips a coin!",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    var randomIndex = Math.floor(Math.random() * flipcoin.length); 

    message.channel.send(`<@${member.user.id}> `+ flipcoin[randomIndex] + ' 🧫');
}
    
}