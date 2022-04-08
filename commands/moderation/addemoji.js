module.exports = {
    description: 'Adds an emoji to the guild!',
    aliases: ['aemoji'],
    usage: 'addemoji <image/gif url>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send(new client.embed().setDescription(`You are missing permissions \`MANAGE_EMOJIS\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args[0]) return message.channel.send(new client.embed().setDescription(`Please write the name for the emoji!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (args[0].length > 32 || args[0].length < 2) return message.channel.send(new client.embed().setDescription('The name must be between 2 and 32 characters').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!args[1]) return message.channel.send(new client.embed().setDescription(`Please insert the emoji url!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    message.guild.emojis.create(args[1], args[0]).then(e =>
        message.channel.send(new client.embed().setDescription(`I have created the emoji ${e}`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    ).catch(() => message.channel.send(new client.embed().setDescription('Please enter a valid image/gif link!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))))
}