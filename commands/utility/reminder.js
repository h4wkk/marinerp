const parse = require('parse-duration');

module.exports = {
    description: 'Lets you set a reminder.',
    aliases: [`rem`],
    usage: 'reminder <TIME> <Reason>'
}

module.exports.run = async(client, message, args) => {
    let embed3 = new client.embed()
        .setDescription(`Please provide a valid time!`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    let [end, ...reason] = args

    if ([null, Infinity].includes(parse(end))) return message.channel.send(embed3);
    if (!reason[0]) return message.channel.send(new client.embed().setDescription('You need to enter what to remind you about!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const embed = new client.embed()
        .setAuthor('Reminder!')
        .setDescription(`**Reminder**\n${reason.join(' ')}\n\n**Reminded At**\n${require('moment')().format('dddd, MMMM Do YYYY [at] h:mm A')}`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    setTimeout(() => {
        message.author.send(embed).catch(() => {})
    }, parse(end))
}