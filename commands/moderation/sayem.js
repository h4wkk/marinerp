module.exports = {
    description: 'Allows you to speak as the bot but in an embed.',
    aliases: [`speakem`],
    usage: 'Sayem <Message>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new client.embed().setDescription(`Sorry you are missing the permission \`ADMINISTRATOR\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    const filter = m => m.author.id === message.author.id
    let say = args.slice(0).join(" ")
    if (!say) return message.channel.send(new client.embed().setDescription(`You didn\'t provide any text for me to say!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    message.delete()
    const embed = new client.embed().setDescription(say)
    message.channel.send(embed)


}