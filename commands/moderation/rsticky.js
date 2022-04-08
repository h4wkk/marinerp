module.exports = {
    description: 'Removes a sticky message.',
    aliases: ['removesticky', 'stickyremove'],
    usage: 'rsticky'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new client.embed().setDescription('You are missing the permission `Manage Channels`').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!client.settings.get(message.guild.id, `sticky.${message.channel.id}`)) return message.channel.send(new client.embed().setDescription('There arent any sticky messages on this channel!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.settings.delete(message.guild.id, `sticky.${message.channel.id}`)
    message.reply(`You deleted the sticky message for this channel!`)
}