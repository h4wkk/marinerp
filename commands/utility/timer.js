const parse = require('parse-duration');
const ms = require('humanize-duration')

module.exports = {
    description: 'Lets you set a timer.',
    aliases: [`time`],
    usage: 'timer <Time>'
}

module.exports.run = async(client, message, args) => {
    let embed3 = new client.embed()
        .setDescription(`Please provide a valid time!`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    if ([null, Infinity].includes(parse(args[0]))) return message.channel.send(embed3);

    const end = Date.now() + parse(args[0]);

    const embed = new client.embed()
        .setAuthor(`ACTIVE TIMER`)
        .setDescription(`⏰ **Time**: ${ms(end - Date.now(), {round: true})}`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    const msg = await message.channel.send(embed);

    const timer = setInterval(() => {
        const embed2 = new client.embed()
            .setAuthor(`ACTIVE TIMER`)
            .setDescription(`⏰ **Time**: ${ms(end - Date.now(), { round: true })}`)
            .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

        if (Date.now() > end) {
            const done = new client.embed()
                .setDescription(`Timer has ended!`)
            clearInterval(timer)
            return msg.edit(done)
        } else msg.edit(embed2)
    }, 5000);
}