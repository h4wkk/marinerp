module.exports = {
    description: 'Clockin to your work place!',
    aliases: ['cin'],
    usage: 'clockin <Department>'
}

module.exports.run = async(client, message, args) => {

    const clockedIn = client.members.get(message.guild.id, `${message.author.id}.clockedIn`)
    const chan = client.channels.cache.get(client.conf.FiveM.Time_Sheets_Channel)
    const embed3 = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    if (clockedIn) return message.channel.send(embed3.setDescription('You cant clock in more than once!'))
    if (!args[0]) return message.channel.send(embed3.setDescription(`Please type the department you would like to clockin to!`));

    const embed = new client.embed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`${message.guild.name} | Made By Fuel#2649 | To view your total time run ${message.px}totaltime`, message.guild.iconURL({ dynamic: true }))
        .setTitle("Clocked In")
        .addField("Department", args.join(' '))
        .addField("Employee", message.author.tag)
        .addField("Time", message.createdAt.toLocaleString());

    if (chan) chan.send(embed);

    const success = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
        .setDescription(`You have successfully clocked in. \nDepartment: **${args.join(' ')}**`)

    message.channel.send(success);
    client.members.set(message.guild.id, args.join(' '), `${message.author.id}.department`)
    client.members.set(message.guild.id, Date.now(), `${message.author.id}.clockedIn`)
}