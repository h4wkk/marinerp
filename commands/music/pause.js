module.exports = {
    description: 'Pause that awful song, and maybe comeback to it later.',
    aliases: [],
    usage: 'pause'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    client.player.pause(message)
    message.channel.send(new client.embed().setDescription('The current song has now been paused.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}