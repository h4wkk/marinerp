module.exports = {
    description: 'Closes a users DM on the server.',
    aliases: [],
    usage: 'closedm'
}

module.exports.run = async(client, message, args) => {

    const embed = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    let dmchannel = Object.entries(client.settings.get(message.guild.id, 'dms')).find(([, obj]) => obj.channel === message.channel.id)
    if (!dmchannel) return message.channel.send(embed.setDescription('This isnt a dm channel.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(embed.setDescription('This channel will be deleted in 10 seconds.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    client.settings.delete(message.guild.id, `dms.${dmchannel[1].user}`)

    await new Promise(r => setTimeout(r, 10000))
    message.channel.delete().catch(() => {})
}