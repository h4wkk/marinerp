const parse = require('parse-duration')

module.exports = {
    description: 'Add roles to a member for a specific amount of time.',
    aliases: [],
    usage: 'temrole <@user> <@role> <time>'
}

module.exports.run = (client, message, args) => {
    const member = message.mentions.members.first()
    const role = message.mentions.roles.first()

    if (!client.conf.tempvc.enabled) return
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new client.embed().setDescription('You are missing the permission \`Manage Roles\`!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!member || args[0] !== member.toString()) return message.channel.send(new client.embed().setDescription('You need to mention a member to add a role to them!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) return message.channel.send(new client.embed().setDescription('You cant assign a role to a member with roles higher than your own!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (member.roles.highest.rawPosition >= message.guild.me.roles.highest.rawPosition) return message.channel.send(new client.embed().setDescription('You cant assign a role to a member with roles higher than my own!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!role || args[1] !== role.toString()) return message.channel.send(new client.embed().setDescription('You need to enter the role to give to the member!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if ([null, Infinity].includes(parse(args[2]))) return message.channel.send(new client.embed().setDescription('You need to enter how long until the role gets removed\nExample: `1m` = 1 minute, `1d` = 1 day.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (member.roles.cache.has(role.id)) return message.channel.send(new client.embed().setDescription(`Sorry but that member already has the role ${role}`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    member.roles.add(role)

    setTimeout(() => {
        member.roles.remove(role)
    }, parse(args[2]))

    message.channel.send(new client.embed().setDescription(`Successfully added the role ${role} to ${member}!\nThe role will be removed in ${args[2]}`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}