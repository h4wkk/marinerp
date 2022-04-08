module.exports = {
    description: 'Pulls the servers icon.',
    aliases: ['guildicon'],
    usage: 'servericon'
}

module.exports.run = async(client, message) => {
    const embed = new client.embed()
        .setTitle(`${message.guild.name}\'s Icon`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    message.channel.send(embed);

}