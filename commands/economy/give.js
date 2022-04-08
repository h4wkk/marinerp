module.exports = {
    description: 'Give money to a user on the server.',
    aliases: ['gv'],
    usage: 'give [@User] <amount>'
}

module.exports.run = async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const authbal = client.members.get(message.guild.id, `${message.author.id}.balance.wallet`)

    if (!user) return message.channel.send(new client.embed().setDescription('You need to mention a person to send them money!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (isNaN(args[1]) || args[1] < 1) return message.channel.send(new client.embed().setDescription('You need to enter how much money your giving/taking away from that user!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (authbal < args[1]) return message.channel.send(new client.embed().setDescription(`You dont have ${args[1]} ${message.coin}! You only have ${authbal} ${message.coin} in your wallet!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    client.members.math(message.guild.id, '+', Number(args[1]), `${user.id}.balance.wallet`)
    client.members.math(message.guild.id, '-', Number(args[1]), `${message.author.id}.balance.wallet`)
    message.channel.send(`${args[1]} ${message.coin} has been addeded from ${user}'s wallet!`)
}