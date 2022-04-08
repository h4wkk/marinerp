const moment = require(`moment`)
module.exports = {
    description: 'Lets you delete a channel.',
    aliases: ['deletechan', 'deletechnl'],
    usage: 'deletechannel name'
}

module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new client.embed().setDescription('Sorry! You are missing the permission \`MANAGE_CHANNELS\`').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new client.embed().setDescription('Sorry! My roles not high enough!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    let Channeldeletelol = message.mentions.channels.first()

    if (!Channeldeletelol) return message.channel.send(new client.embed().setDescription('Sorry! You need to mention the channel.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))


    message.channel.send(
        new client.embed()
        .setTitle(`Sucess! I have deleted the channel!`)
        .addField('Action', `Channel Deleted`)
        .addField('Moderator', message.author)
        .addField('Command Executed In', message.channel)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
        .addField('Time', require('moment')().format('ddd, MMMM Do YYYY [at] hh:mm A')))
    await Channeldeletelol.delete()

}