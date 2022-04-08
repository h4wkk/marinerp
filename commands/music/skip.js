module.exports = {
    description: 'Skip the awful song playing.',
    aliases: ['sk'],
    usage: 'skip'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    client.player.skip(message)
    message.channel.send(new client.embed().setDescription('The current song has now been skipped!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}