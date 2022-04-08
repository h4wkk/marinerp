const dur = require('humanize-duration')

module.exports = {
    description: 'Clockout of your work place!',
    aliases: ['cout'],
    usage: 'clockout <Department>'
}

module.exports.run = async(client, message, args) => {

    const time = client.members.get(message.guild.id, `${message.author.id}.clockInTime`)
    const embed3 = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    if (!time) return message.channel.send(embed3.setDescription('You currently dont have any clocked in time!'));

    message.channel.send(embed3
        .setTitle('Total time')
        .setDescription(dur(time, { conjunction: " and ", serialComma: false, round: true }))
    )
}