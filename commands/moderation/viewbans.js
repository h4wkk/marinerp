module.exports = {
    description: 'Lets you see the ban count in the guild.',
    aliases: ['vbans', 'viewingbans'],
    usage: 'viewbans'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new client.embed().setDescription(`You are missing permission \`ADMINISTRATOR\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
    message.guild.fetchBans().then(bans => {
        message.channel.send(new client.embed()
            .setTitle(`Ban Count For ${message.guild.name}`)
            .setDescription(`Count: \`${bans.size}\``)
            .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    })

}