module.exports = {
    description: 'Steal emojis from another server and add them to this one.',
    aliases: ['stealem'],
    usage: 'stealemoji <custom emojis>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(new client.embed().setDescription(`You are missing permissions \`MANAGE_EMOJIS\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args.join(' ').match(/<a?:(\w{1,32}):(\d{17,19})>/g)) return message.channel.send(new client.embed().setDescription(`Please write some custom emojis for me to steal!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const emojis = [...args.join(' ').matchAll(/<a?:(\w{1,32}):(\d{17,19})>/g)].map(s => [s[1], s[2]])
    if (emojis.length > 5) return message.channel.send(new client.embed().setDescription(`You cant create more than 5 emojis at once!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    const created = []

    for (var e of emojis)
        created.push(await message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${e[1]}.png?v=1`, e[0]).catch(() => {}))

    message.channel.send(new client.embed().setDescription(`Created the following emojis: ${created.map(s => s.toString()).join(' ')}`))
}