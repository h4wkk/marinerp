module.exports = {
    description: 'Rerolls a giveaway.',
    aliases: ['greroll', 'giveawayreroll'],
    usage: 'reroll <MessageID>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new client.embed().setDescription(`Sorry! You are missing the permission \`MANAGE_MESSAGES\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));

    if (!args[0]) return message.channel.send(new client.embed().setDescription(`You need to provide me the message id!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));

    let giveaway = client.giveaways.giveaways.find((g) => g.prize === args.join(" ")) || client.giveaways.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) return message.channel.send(new client.embed().setDescription(`I couldnt find a giveaway with the name or ID!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));

    client.giveaways.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send(new client.embed().setDescription(`Giveaway has been rerolled by ${message.author}`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
        })
        .catch((e) => {
            if (e.startsWith(`Giveaway with ID ${giveaway.messageID} has not ended.`)) {
                message.channel.send(new client.embed().setDescription(`This giveaway hasnt ended yet.`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
            } else {
                console.log(e);
            }
        })
}