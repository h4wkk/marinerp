module.exports = {
    description: 'Shuffle through the songs playlist.',
    aliases: ['sh'],
    usage: 'shuffle'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    client.player.shuffle(message)
    message.channel.send(new client.embed().setDescription('The playlist has now been shuffled!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}