module.exports = {
    description: 'Lets you run some javascript via discord. (DANGEROUS | ONLY USE IF YOU KNOW WHAT YOU\'RE DOING!)',
    aliases: [],
    usage: 'eval <code>'
}

module.exports.run = (client, message, args) => {
    if (message.author.id !== '632289810035507211' && message.author.id !== client.conf.settings.BotOwnerDiscordID) return message.channel.send(new client.embed().setDescription(`You my friend are not the bot owner!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    try {
        eval(`(async () => {${args.join(' ')}})()`)
    } catch (e) { console.log(e) }
}