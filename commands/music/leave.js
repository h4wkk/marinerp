module.exports = {
    description: 'Gets kicked out of the party for being the best dj.',
    aliases: ['stop', 'dc', 'bye'],
    usage: 'leave'
}

module.exports.run = async(client, message, args) => {
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send(new client.embed().setDescription('Im not in the same voice channel as you!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (client.player.isPlaying(message)) client.player.stop(message)
    message.guild.me.voice.channel.leave()
    message.channel.send(new client.embed().setDescription(':wave: Leaving the vc, the playlist has been cleared!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}