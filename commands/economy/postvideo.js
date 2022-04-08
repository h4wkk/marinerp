const { random, sample } = require('lodash')

module.exports = {
    description: 'Post a video and hope for some views.',
    aliases: ['pv'],
    usage: 'postvideo'
}

module.exports.run = async(client, message, args) => {
    const data = client.members.get(message.guild.id, message.author.id)
    if (!data.inventory.items.some(s => s.name.includes('Computer'))) return message.channel.send(new client.embed().setDescription(`You need to buy a computer to post a video! Buy one from the \`${message.px}shop\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    const chance = Math.random() > 0.5

    if (chance) {
        const profits = random(10, 30)
        message.channel.send(`You posted a **${sample(['reaction', 'gaming', 'music', 'unboxing', 'tutorial'])}** video and got **${random(100, 10000)}** views!\n**${profits}** ${message.coin} has been added to your wallet!`)
        client.members.math(message.guild.id, '+', profits, `${message.author.id}.balance.wallet`)
    } else
        message.channel.send(`You posted a **${sample(['reaction', 'gaming', 'music', 'unboxing', 'tutorial'])}** video and got **0** views!\nBetter luck next time!`)

}