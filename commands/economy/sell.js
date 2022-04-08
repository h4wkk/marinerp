module.exports = {
    description: 'Sell something from your inventory.',
    aliases: [],
    usage: 'sell <item number>'
}

module.exports.run = async(client, message, args) => {
    const data = client.members.get(message.guild.id, message.author.id)
    const item = data.inventory.items.find((s, i) => i + 1 == args[0])

    if (!item) return message.channel.send(new client.embed().setDescription(`You need to enter the item id! do \`${message.px}inventory\` to view all the things you can sell!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(`You've sold ${item.name} for ${Math.floor(item.price * 0.9)} ${message.coin}! The money has been added to your wallet!`)
    client.members.math(message.guild.id, '+', Math.floor(item.price * 0.9), `${message.author.id}.balance.wallet`)
    client.members.delete(message.guild.id, `${message.author.id}.inventory.items[${args[0]-1}]`)
}