module.exports = {
    description: 'Like the song? Fetch the name using me.',
    aliases: ['np'],
    usage: 'nowplaying'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const queue = client.player.getQueue(message)
    const song = queue.songs[0]
    const start = Math.floor((Date.now() - queue.dispatcher.startTime) / 1000)
    const duration = ~~(start / song.duration * 30)

    const embed = new client.embed()
        .setDescription(`Now Playing [${song.name}](${song.url})`)
        .addField('Duration', song.formattedDuration, true)
        .addField('Requested by:', song.user, true)
        .addField('Time', `${ms(start*1000)} ${'-'.repeat(duration) + '◉' + '-'.repeat(30 - duration)} ${song.formattedDuration}`)
        .setThumbnail(song.thumbnail)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    message.channel.send(embed)
}

function ms(duration) {
    var seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return [minutes, seconds].join(':')
}