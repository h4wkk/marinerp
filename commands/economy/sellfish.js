module.exports = {
    description: 'Sell all those fish you caught.',
    aliases: [`fishsell`],
    usage: 'sellfish'
}

module.exports.run = async(client, message, args) => {
    const fish = client.members.get(message.guild.id, `${message.author.id}.inventory.fish`)
    if (!fish) return message.channel.send(new client.embed().setDescription(`You dont have any fish to sell! Go fish for some with \`${message.px}fish\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const amount = 5 * fish
    message.channel.send(new client.embed().setDescription(`You sold **${fish}** for **${amount}** ${message.coin}!\nThe money has been added to your wallet`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.members.math(message.guild.id, '+', amount, `${message.author.id}.balance.wallet`)
    client.members.set(message.guild.id, 0, `${message.author.id}.inventory.fish`)
}