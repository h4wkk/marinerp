module.exports = {
    description: 'Allows you to see the permanent server invite.',
    aliases: ['invlink', 'invitelnk'],
    usage: 'invitelink'
}

module.exports.run = async(client, message, args) => {

    const embed = new client.embed()
        .setTitle(`Servers Invite Link!`)
        .setDescription(client.conf.automation.Invite_Link)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }));
    message.channel.send(embed)
}