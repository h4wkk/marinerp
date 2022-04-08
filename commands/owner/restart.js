module.exports = {
    description: 'Lets you restart the bot via discord.',
    aliases: ['bootup'],
    usage: 'restart'
}

module.exports.run = async(client, message, args) => {
    if (message.author.id !== client.conf.settings.BotOwnerDiscordID) return message.channel.send(new client.embed().setDescription(`You my friend are not the bot owner!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.channel.send(':robot: Initializing Self Destruct...').then(() => {
        client.destroy()
        client.login(client.conf.settings.token)
    })
}