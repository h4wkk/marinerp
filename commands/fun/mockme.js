module.exports = {
    description: 'Mocks whatever you enter.',
    aliases: ['mock'],
    usage: 'mockme <words>'
}

module.exports.run = async(client, message, args) => {
    if (!args[0]) return message.channel.send(new client.embed().setDescription(`You need to give me something to mock!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    const mock = args.join(' ').split('').map((s, i) => i % 2 ? s.toLowerCase() : s.toUpperCase()).join('')
    message.channel.send(mock)
}