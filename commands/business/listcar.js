module.exports = {
    description: 'Lets you create a listing for your vehicles.',
    aliases: ['createlisting'],
    usage: 'listcar'
}

module.exports.run = async(client, message, args) => {
    const embed = new client.embed()
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply(`Sorry you are missing the permission \`ADMINISTRATOR\``).then(w => w.delete({ timeout: 5000 }));
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 60000 })
    const data = []

    message.channel.send(embed.setDescription(`What is the name of the vehicle you are wishing to list?`))

    collector.on('collect', m => {
        data.push(m.content)

        if (!data[1]) message.channel.send(embed.setDescription(`Please type a description on the vehicle.`))
        else if (!data[2]) message.channel.send(embed.setDescription(`Please type whats included in this vehicle. No Extras! Im talking about Breakable Windows, 360 Degree Lighting , Multi Livery Support ETC!`))
        else if (!data[3]) message.channel.send(embed.setDescription(`Does this vehicle come with a template?`))
        else if (!data[4]) {
            if (!['yes', 'no'].includes(m.content)) return message.channel.send(embed.setDescription('Please specify if this vehicle comes with a template. (yes/no)'))
            message.channel.send(embed.setDescription(`Please provide the credits.`))
        } else if (!data[5]) message.channel.send(embed.setDescription(`Please provide the showcase video/imgur. (type none to skip this)`))
        else if (!data[6]) message.channel.send(embed.setDescription(`Whats the price going to be?`))
        else if (!data[7]) {
            if (isNaN(m.content)) return message.channel.send(embed.setDescription('You must enter a number for how much the product will cost.'))
            message.channel.send(embed.setDescription(`Please provide an image link for the embed! (type none to skip this)`))
        } else if (!data[8]) message.channel.send(embed.setDescription(`Please provide the extras or parts on this vehicle!`))
        else {
            collector.stop()
            const product = new client.embed()
                .setTitle(`**__${data[0]}__**`)
                .setDescription(data[1])
                .addField('Description:', data[2], false)
                .addField('Comes with a Template:', data[3], false)
                .addField('Credits:', data[4], false)
                .addField('Showcase/Image Gallery:', data[5], false)
                .addField('Price:', data[6], true)
                .addField('Extra Info:', data[8], false)
                .setAuthor(`New Listing From ${message.author.tag}`, message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
                .setImage(data[7] == 'none' ? null : data[7])
                .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
                .setTimestamp()

            message.channel.send(product);
        }
    })

    collector.on('end', () => data[7] ? '' : message.channel.send('Time limit exceeded, command canceled.'))
}