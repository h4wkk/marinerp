module.exports = {
    description: 'Deposit your money on hand into your bank.',
    aliases: ['dp'],
    usage: 'dp <amount | all>'
}

module.exports.run = async(client, message, args) => {
    const data = client.members.get(message.guild.id, `${message.author.id}.balance`)

    let data2 = client.members.get(message.guild.id, `${message.author.id}.inventory.items`)
    if (!data2.some(s => s.name.includes('Bank'))) return message.channel.send(new client.embed().setDescription(`You need to get a bank card to deposit money! Buy one using \`${message.px}shop\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (!args[0] || (isNaN(args[0]) && args[0] !== 'all')) return message.channel.send(new client.embed().setDescription(`You need to enter how much you want to deposit!\nExample: \`${message.px}dp 100\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!data.wallet) return message.channel.send(new client.embed().setDescription('You dont have any money in your wallet to withdraw!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (args[0] === 'all') {
        message.channel.send(`You have successfully deposited ${data.wallet} ${message.coin}!\nThe money has been added to your wallet.`)
        return client.members.set(message.guild.id, { wallet: 0, bank: data.wallet }, `${message.author.id}.balance`)
    }
    if (args[0] > data.wallet) return message.channel.send(new client.embed().setDescription(`You cant deposit that much! You only have ${data.wallet} ${message.coin}!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (args[0] < 1) return message.channel.send(new client.embed().setDescription(`You cant withdraw less than 1 ${message.coin}!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(`You have successfully withdrawed ${args[0]} ${message.coin}!\nThe money has been added to your wallet.`)
    client.members.set(message.guild.id, { wallet: data.wallet - Number(args[0]), bank: data.bank + Number(args[0]) }, `${message.author.id}.balance`)
}