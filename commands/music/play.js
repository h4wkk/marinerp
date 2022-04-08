module.exports = {
    description: 'Lets you play tunes in a voice channel.',
    aliases: ['p'],
    usage: 'play <song name | youtube url | youtube playlist>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(new client.embed().setDescription('You need to be in a voice channel to play music.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (message.guild.me.voice.channelID && message.guild.me.voice.channelID !== message.member.voice.channelID)
        return message.channel.send(new client.embed().setDescription('Im already playing in a different voie channel.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (!args[0]) return message.channel.send(new client.embed().setDescription('You need to enter a song name, url or playlist for me to play.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.member.voice.channel.join()
    await client.player.play(message, args.join(' '))
    await client.player.toggleAutoplay(message)
}