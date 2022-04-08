module.exports = {
    description: 'Loop that catchy tune as long as you want!',
    aliases: [],
    usage: 'loop <disable | song | queue>'
}

module.exports.run = async(client, message, args) => {
        if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
        if (!['disable', 'song', 'queue'].includes(args[0])) return message.channel.send(new client.embed().setDescription('You need to enter either `disable`, `song`, or `queue` to enable or disable looping').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

        const rm = client.player.getQueue(message).repeatMode
        const types = ['disable', 'song', 'queue']

        if (types[rm] === args[0]) return message.channel.send(new client.embed().setDescription(`The repeat mode is already set to \`${args[0]}\``))

        client.player.setRepeatMode(message, args[0])
        message.channel.send(new client.embed().setDescription(args[0] === 'disable' ? 'Looping has now been disabled' : `The current ${args[0]} will now be bass boosted!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    } //