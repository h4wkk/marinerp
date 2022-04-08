module.exports = {
    description: 'Clears the requested ammount of messages.',
    aliases: ['clear'],
    usage: 'purge <ammount>'
}

module.exports.run = async(client, message, args) => {
    const embed = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(new client.embed().setDescription(`You are missing permission \`MANAGE_MESSAGES\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
    if (!args[0]) return message.channel.send(embed.setDescription('Please provide the ammount of messages that you would like to delete!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (args[0] > 100) return message.channel.send(embed.setDescription('You cannot clear more than 100 messages at once!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (args[0] < 1) return message.channel.send(embed.setDescription('You need to delete at least one message!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.bulkDelete(args[0], true).then(messages => {
        let embed = new client.embed()
            .setAuthor(`${message.author.tag} - (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Action:** Purge\n**Messages:** \`${args}\`\n**Channel:** ${message.channel}`)
            .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    }).catch(() =>
        message.channel.send(new client.embed().setDescription('Sorry, I cannot delete messages that are 14 days or older!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    )
}