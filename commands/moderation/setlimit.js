module.exports = {
    description: 'Set the user limit to your temporary vc.',
    aliases: [],
    usage: 'setlimit <amount>'
}

module.exports.run = (client, message, args) => {
    const vcSettings = client.settings.get(message.guild.id, `vc.${message.member.voice.channelID}`)
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new client.embed().setDescription(`You are missing permission \`ADMINISTRATOR\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
    if (!client.conf.tempvc.enabled) return
    if (!message.member.voice.channelID) return message.channel.send(new client.embed().setDescription('You need to enter your temporary vc to add users!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!vcSettings) return message.channel.send(new client.embed().setDescription('This isnt a temporary vc channel!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (vcSettings.user !== message.author.id) return message.channel.send(new client.embed().setDescription('You can only add users to your own temporary vc').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args[0] || args[0] < 0 || args[0] !== 'none' || args[0] > 99) return message.channel.send(new client.embed().setDescription('You can only add users to your own temporary vc').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))


    members.each(s => message.member.voice.channel.updateOverwrite(s.id, { CONNECT: true }))
}