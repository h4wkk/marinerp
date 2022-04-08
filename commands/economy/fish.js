const { sample, random } = require('lodash')

module.exports = {
    description: 'Go fishing and get some tasty fish.',
    aliases: [],
    usage: 'fish'
}

module.exports.run = async(client, message, args) => {
    let fish = ['dory', 'coho salmon', 'lanternfish', 'catfish', 'shrimp', 'stargazer', 'clown fish', 'cod', 'tropical fish']
    let trash = ['boot', 'water bottle', 'bucket', 'bone', 'wrench']
    let caught = random(0, 2)
    let data = client.members.get(message.guild.id, `${message.author.id}.inventory.items`)
    if (!data.some(s => s.name.includes('Fishing'))) return message.channel.send(new client.embed().setDescription(`You cant fish without a fishing rod! Buy one using \`${message.px}shop\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (caught) {
        let amount = random(1, 7)
        if (caught === 1) return message.channel.send(`:fishing_pole_and_fish: **|** No luck! looks like you caught a **${sample(trash)}** ! :c`)
        message.channel.send(`:fishing_pole_and_fish: **|** After a few swings, you caught yourself **${amount}** **${sample(fish)}**!\nThe fish have been added to your inventory, sell them with \`${message.px}sellfish\``)
        client.members.math(message.guild.id, '+', amount, `${message.author.id}.inventory.fish`)
    } else
        message.channel.send(':fishing_pole_and_fish: **|** Looks like you didnt catch anything! Better luck next time!')
}