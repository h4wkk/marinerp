module.exports = {
    description: 'Sell all those meat you hunted.',
    aliases: [],
    usage: 'sellmeat'
}

module.exports.run = async(client, message, args) => {
    const meat = client.members.get(message.guild.id, `${message.author.id}.inventory.meat`)
    if (!meat) return message.channel.send(new client.embed().setDescription(`You dont have any meat to sell! Go hunt for some with \`${message.px}meat\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const amount = 5 * meat
    message.channel.send(new client.embed().setDescription(`You sold **${meat}** for **${amount}** ${message.coin}!\nThe money has been added to your wallet`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.members.math(message.guild.id, '+', amount, `${message.author.id}.balance.wallet`)
    client.members.set(message.guild.id, 0, `${message.author.id}.inventory.meat`)
}