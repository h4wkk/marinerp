module.exports = {
    description: 'Wanna hurt your friends ears... LOOK NO FURTHER.',
    aliases: ['bb'],
    usage: 'bassboost <on | off>'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!['on', 'off'].includes(args[0])) return message.channel.send(new client.embed().setDescription('You need to enter either `on` or `off` to enable or disable bass boost mode').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const autoplay = client.player.getQueue(message).filter === 'bassboost'
    if (autoplay === (args[0] == 'on' ? true : false)) return message.channel.send(new client.embed().setDescription(`Bass boost mode is already ${autoplay ? 'enabled' : 'disabled'}`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.player.setFilter(message, 'bassboost')
    message.channel.send(new client.embed().setDescription('The current song playlist will now be bass boosted!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}