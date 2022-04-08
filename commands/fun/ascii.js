const figlet = require('figlet')

module.exports = {
    description: 'Lets you turn text into ascii art.',
    aliases: [`cooltext`],
    usage: 'ascii <text>'
}

module.exports.run = async(client, message, args) => {
    if (!args[0]) return message.channel.send(new client.embed().setDescription('Please provide some text').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    figlet.text(args.join(' '), (err, data) => {
        if (err) return
        if (data.length > 2000)
            return message.channel.send(new client.embed().setDescription(`Sorry please provide a text shorter than 2000 charachters!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
        message.channel.send('```\n' + data + '```')
    })
}