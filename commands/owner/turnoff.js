module.exports = {
    description: 'Lets you turnoff the bot via discord.',
    aliases: ['selfdestruct', 'shutdown'],
    usage: 'turnoff'
}

module.exports.run = async(client, message, args) => {
    if (message.author.id !== client.conf.settings.BotOwnerDiscordID) return message.channel.send(new client.embed().setDescription(`You my friend are not the bot owner!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(':robot: Turning Off.... I will miss you for the time being :blue_heart: ').then(() => {
        client.destroy()
    })
}