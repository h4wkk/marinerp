module.exports = {
    description: 'Allows you to view the bots ping.',
    aliases: ['pings', 'bping'],
    usage: 'ping'
}

module.exports.run = async(client, message, args) => {
    message.channel.send(`Checking Ping for ${message.guild.name}!`).then(msg3 => {
        message.channel.send(`Ping Results!`).then(msg => {
            const Ping2 = new client.embed().setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })).setDescription(
                `Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${client.ws.ping}ms`)
            msg.edit({ content: '', embed: Ping2 })
            msg3.edit(`Ping results for **${message.guild.name}**!`)
        })
    })
}