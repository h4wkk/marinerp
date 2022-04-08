module.exports = {
    description: 'Sell all those cheques you got working.',
    aliases: [`sc`],
    usage: 'sellcheques'
}

module.exports.run = async(client, message, args) => {
    const cheques = client.members.get(message.guild.id, `${message.author.id}.inventory.cheques`)
    if (!cheques) return message.channel.send(new client.embed().setDescription(`You dont have any cheques to sell! Go work for some with \`${message.px}work\``))

    const amount = 5 * cheques
    message.channel.send(new client.embed().setDescription(`You sold **${cheques}** for **${amount}** ${message.coin}!\nThe money has been added to your wallet`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.members.math(message.guild.id, '+', amount, `${message.author.id}.balance.wallet`)
    client.members.set(message.guild.id, 0, `${message.author.id}.inventory.cheques`)
}