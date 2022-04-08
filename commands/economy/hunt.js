const { sample, random } = require('lodash')

module.exports = {
    description: 'Go hunting and get some food.',
    aliases: [],
    usage: 'hunt'
}

module.exports.run = async(client, message, args) => {
    let fish = ['deer', 'lamb', 'bear', 'cow', 'sheep', 'pig', 'elephant', 'ostrich', 'wolf']
    let trash = ['brick', 'paper', 'bucket', 'bone', 'wrench']
    let caught = random(0, 2)
    let data = client.members.get(message.guild.id, `${message.author.id}.inventory.items`)
    if (!data.some(s => s.name.includes('Bow'))) return message.channel.send(new client.embed().setDescription(`You cant hunt without a gun! Buy one using \`${message.px}shop\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (caught) {
        let amount = random(1, 7)
        if (caught === 1) return message.channel.send(`🏹 **|** No luck! looks like you caught a **${sample(trash)}** ! :c`)
        message.channel.send(`🏹 **|** After a few shots, you got yourself a **${sample(fish)}** and salvaged **${amount}** meat!\nThe meat have been added to your inventory, sell them with \`${message.px}sellmeat\``)
        client.members.math(message.guild.id, '+', amount, `${message.author.id}.inventory.meat`)
    } else
        message.channel.send('🏹 **|** Looks like you didnt catch anything! Better luck next time!')
}