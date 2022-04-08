module.exports = {
    description: 'Autoplay some tunes.',
    aliases: ['ap'],
    usage: 'autoplay <on | off>'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!['on', 'off'].includes(args[0])) return message.channel.send(new client.embed().setDescription('You need to enter either `on` or `off` to enable or disable autoplay').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const autoplay = client.player.getQueue(message).autoplay
    if (autoplay === (args[0] == 'on' ? true : false)) return message.channel.send(new client.embed().setDescription(`Autoplay is already ${autoplay ? 'enabled' : 'disabled'}`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    client.player.toggleAutoplay(message)
    message.channel.send(new client.embed().setDescription(`Autoplay is now ${autoplay ? 'Disabled' : 'Enabled'}`))
}