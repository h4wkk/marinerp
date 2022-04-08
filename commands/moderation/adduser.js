const parse = require('parse-duration')

module.exports = {
    description: 'Add users to your temporary voice channel!',
    aliases: ['addtovc'],
    usage: 'adduser <@user>'
}

module.exports.run = async(client, message, args) => {
    const vcSettings = client.settings.get(message.guild.id, `vc.${message.member.voice.channelID}`)
    const members = message.mentions.members
    if (!message.member.hasPermission("MUTE_MEMBERS"))
        return message.channel.send(new client.embed().setDescription(`You are missing permission \`MUTE_MEMBERS\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
    if (!client.conf.tempvc.enabled) return
    if (!message.member.voice.channelID) return message.channel.send(new client.embed().setDescription('You need to enter your temporary vc to add users!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!vcSettings) return message.channel.send(new client.embed().setDescription('This isnt a temporary vc channel!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (vcSettings.user !== message.author.id) return message.channel.send(new client.embed().setDescription('You can only add users to your own temporary vc').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!members.size) return message.channel.send(new client.embed().setDescription('You need to mention members youre going to add to the vc!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (members.size > 5) return message.channel.send(new client.embed().setDescription('You cant add more than 5 members at once.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    members.each(s => message.member.voice.channel.updateOverwrite(s.id, { CONNECT: true }))
}