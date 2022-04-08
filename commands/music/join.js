module.exports = {
    description: 'Arrives to the party with some tunes.',
    aliases: [],
    usage: 'join'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(new client.embed().setDescription('You need to be in a voice channel for me to join!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.member.voice.channel.join()
    message.channel.send(new client.embed().setDescription(`:wave: Joined the vc and ready to play a song ! use \`${message.px}play\` to play a song`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}