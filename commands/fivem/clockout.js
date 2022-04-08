module.exports = {
    description: 'Clockout of your work place!',
    aliases: ['cout'],
    usage: 'clockout <Department>'
}

module.exports.run = async(client, message, args) => {
    const clockedIn = client.members.get(message.guild.id, `${message.author.id}.clockedIn`)
    const department = client.members.get(message.guild.id, `${message.author.id}.department`)
    const time = client.members.get(message.guild.id, `${message.author.id}.clockInTime`)

    const chan = client.channels.cache.get(client.conf.FiveM.Time_Sheets_Channel)
    const embed3 = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    if (!clockedIn) return message.channel.send(embed3.setDescription('You cant clock out when you havent clocked in!'))
    if (department !== args.join(' ')) return message.channel.send(embed3.setDescription(`You havent clocked into ${args.join(' ')}!\nYou're currently clocked into ${department}`))
    if (!args[0]) return message.channel.send(embed3.setDescription(`Please type the department you would like to clockin to!`));

    const embed = new client.embed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`${message.guild.name} | Made By Fuel#2649 | To view your total time run ${message.px}totaltime`, message.guild.iconURL({ dynamic: true }))
        .setTitle("Clocked Out")
        .addField("Department", args.join(' '))
        .addField("Employee", message.author.tag)
        .addField("Time", message.createdAt.toLocaleString());

    if (chan) chan.send(embed);

    const success = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
        .setDescription(`You have successfully clocked out.\nDepartment: **${args.join(' ')}**`)

    message.channel.send(success);
    client.members.set(message.guild.id, null, `${message.author.id}.department`)
    client.members.set(message.guild.id, null, `${message.author.id}.clockedIn`)
    client.members.set(message.guild.id, Date.now() - clockedIn + (time || 0), `${message.author.id}.clockInTime`)
}