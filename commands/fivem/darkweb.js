const Discord = require(`discord.js`)

module.exports = {
    description: 'Allows you to send a message on the darkweb!',
    aliases: ['drkweb'],
    usage: 'darkweb'
}

module.exports.run = async(client, message, args) => {
    let embed4 = new client.embed().setDescription(`What is your darkweb posting or message?`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    await message.delete();

    const filter = response => response.author.id === message.author.id

    message.channel.send(embed4).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
            var darkmsg = collected.first().content;
            const darkmessage = new Discord.MessageEmbed()
                .setAuthor('The Secret Web', 'https://cdn.discordapp.com/attachments/747932883561218108/762808767938166794/question.png')
                .addField(`Name:`, `ANONYMOUS`, false)
                .addField(`Message:`, darkmsg, false)
                .setColor(`RED`)
                .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
            message.channel.bulkDelete(3)
            message.channel.send(darkmessage);
        })
    })
}