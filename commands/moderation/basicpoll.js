module.exports = {
    description: 'Lets you create a Yes or no poll.',
    aliases: ['bpoll', 'simplepoll.'],
    usage: 'basicpoll <question>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new client.embed().setDescription('You are missing the permission `ADMINISTRATOR`'))

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    const description = args.slice(1).join(" ")

    if (!channel) return message.channel.send(new client.embed().setDescription(`You failed to provide me where im sending this poll!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args[2]) return message.channel.send(new client.embed().setDescription("You didnt specify ur question!").setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const embed = new client.embed({ description })
        .setAuthor(`Poll Created By ${message.author.tag}`, 'https://cdn.discordapp.com/attachments/745089083008745553/758900685919223858/poll.png')
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
        .setTimestamp()

    const msg = await client.channels.cache.get(channel.id).send(embed)
    msg.react('✅').then(msg.react('❌'))
    message.delete();
}