module.exports = {
    description: 'Resume those catchy tunes.',
    aliases: [],
    usage: 'resume'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPaused(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    client.player.resume(message)
    message.channel.send(new client.embed().setDescription('The current song has now been resumed!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}