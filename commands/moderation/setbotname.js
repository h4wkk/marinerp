module.exports = {
    description: 'Allows you to set the bots name.',
    aliases: ['botname', 'setbotsname'],
    usage: 'setbotname <Name>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new client.embed().setDescription(`Sorry you are missing the permission \`ADMINISTRATOR\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.guild.me.setNickname(args.join(' ')).then(() => {
        message.channel.send(new client.embed().setDescription(`Successfully changed my nickname to \`${args.join(' ')}\``))
    }).catch(() => {})
}