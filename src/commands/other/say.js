module.exports = {
    config: {
        name: "say",
        aliases: ["announce"],
        usage: "_say",
        description: "types a specific sentence!",
        permissions: "MANAGE_MESSAGES"
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return;
        const sayMessage = args.join(" ");
    
        message.delete().catch(O_o => {});
    
        message.channel.send(sayMessage);
        return;
    }
}