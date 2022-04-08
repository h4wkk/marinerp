module.exports = {
    description: 'Raise your tunes up.',
    aliases: [],
    usage: 'volume <volume>'
}

module.exports.run = async(client, message, args) => {
    if (!client.player.isPlaying(message)) return message.channel.send(new client.embed().setDescription('Im not playing any songs on the server').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args[0].match(/^([0-9]%|[0-9]{2}%|100%)/g)) return message.channel.send('You need to enter the volume to change to. ex/ 50%')
    client.player.setVolume(message, args[0].slice(0, args[0].length - 1))
    message.channel.send(new client.embed().setDescription(`The song volume has now been set to \`${args[0]}\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
}