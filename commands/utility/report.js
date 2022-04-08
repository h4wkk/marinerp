module.exports = {
    description: 'Lets you submit a report.',
    aliases: [`rep`],
    usage: 'report <Report>'
}

module.exports.run = async(client, message, args) => {
    let channel = client.channels.cache.get(client.conf.logging.Report_Channel_Logs)

    if (!channel) return message.channel.send(new client.embed().setDescription('A report channel hasnt been setup for this server!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args[0]) return message.channel.send(new client.embed().setDescription(`Please provide me a report!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));

    const report = new client.embed()
        .setTitle(`New __REPORT__`)
        .addField('Submitter', message.author)
        .addField('Report', args.join(' '))
        .addField('Time', require('moment')().format('ddd, MMMM Do YYYY [at] hh:mm A'))

    message.delete()
    message.channel.send(new client.embed().setDescription(`Your report for \`${args.join(' ')}\` was submitted!`))
    const msg = await channel.send(report)
}