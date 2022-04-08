const { sample, random } = require('lodash')

module.exports = {
    description: 'Check your balance on the server.',
    aliases: ['bal'],
    usage: 'balance [@User]'
}

module.exports.run = async(client, message, args) => {
    let jobs = [`as a plumber and unclogged ${random(2, 5)} toilets`, 'as a maid and cleaned the white house', `in a mine and found ${random(5, 24)} pieces of coal`, 'at the super market as a shelf stocker', 'in a dungeon as a prison guard']
    let amt = random(1, 3)

    let data = client.members.get(message.guild.id, `${message.author.id}.inventory.items`)
    if (!data.some(s => s.name.includes('Iphone'))) return message.channel.send(new client.embed().setDescription(`You need to buy a phone to apply for a job! Buy one using \`${message.px}shop\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(new client.embed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`You work ${sample(jobs)}, earning you **${amt} cheque(s)**!\nRedeem your cheques by doing \`${message.px}sellcheque\``)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.members.math(message.guild.id, '+', amt, `${message.author.id}.inventory.cheques`)
}