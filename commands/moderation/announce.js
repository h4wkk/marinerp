module.exports = {
    description: 'Allows you to send an announcement on your behalf.',
    aliases: [],
    usage: 'announce <Description>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new client.embed().setDescription(`You are missing permission \`ADMINISTRATOR\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
    let description = args.join(' ')
    if (!description) return message.channel.send(new client.embed().setDescription(`You are missing the description, you need to do \`${message.px}announce <description>\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    let msg = await message.channel.send(new client.embed().setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })).setAuthor(`Announcement From ${message.author.tag}`, message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 })).setDescription(description))
}