module.exports = {
    description: 'Lock the server, kicking anyone who joins.',
    aliases: [`serverlock`],
    usage: 'lockserver'
}

module.exports.run = (client, message, args) => {
    const locked = client.settings.get(message.guild.id, 'locked')
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new client.embed().setDescription(`You are missing permission \`ADMINISTRATOR\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
    if (!client.conf.moderation.serverLock) return message.channel.send(new client.embed().setDescription('This command is disabled, enable it in the configuration.'))

    const embed1 = new client.embed()

    .setAuthor(`${message.author.tag} - (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Action:** Server Lock\n**Status:** ${!locked ? 'Locked' : 'Unlocked'}\n**Time:** ${require('moment')().format('ddd, MMMM Do YYYY [at] hh:mm A')}`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setColor(`RED`)

    message.channel.send(embed1)



    client.settings.set(message.guild.id, !locked, 'locked')

}