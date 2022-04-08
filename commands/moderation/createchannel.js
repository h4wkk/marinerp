const moment = require(`moment`)
module.exports = {
    description: 'Lets you create a channel.',
    aliases: ['createchan', 'createchnl'],
    usage: 'createchannel'
}

module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new client.embed().setDescription('Sorry! You are missing the permission \`MANAGE_CHANNELS\`').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new client.embed().setDescription('Sorry! My roles not high enough!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    let channelnamebruh = args.join(' ')

    if (!channelnamebruh) return message.channel.send(new client.embed().setDescription('Sorry! You failed to provide me the channel name.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(
            new client.embed()
            .setTitle(`Sucess! I have created the channel!`)
            .addField('Action', `Channel Created`)
            .addField('Channel Name', channelnamebruh)
            .addField('Moderator', message.author)
            .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
        .addField('Command Executed In', message.channel)
        .addField('Time', require('moment')().format('ddd, MMMM Do YYYY [at] hh:mm A'))
    message.guild.channels.create(channelnamebruh);

}