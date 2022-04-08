module.exports = {
    description: 'Check the guids music queue.',
    aliases: ['q'],
    usage: 'queue'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    let queue = client.player.getQueue(message);
    message.channel.send(new client.embed({ title: 'Current queue' }).setDescription(queue.songs.map((song, id) =>
        `** ${id + 1}**. ${song.name} - ${song.formattedDuration}`
    ).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))))
}