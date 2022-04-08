const fetch = require('node-fetch')
const urban = require(`relevant-urban`)

module.exports = {
    description: 'Lets you search whatever you want on urban dictionary.',
    aliases: ['ud'],
    usage: 'urban <search>'
}

module.exports.run = async(client, message, args) => {
    if (!args[0]) return message.channel.send(new client.embed().setDescription(`Please tell me what im looking up.`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    let def = await urban(args[0]).catch(() => {}) //NUT NUT
    if (!def) return message.channel.send(new client.embed().setDescription(`Sorry! I couldnt find any results for **${args[0]}**`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const embed = new client.embed()
        .setTitle(`Click Me To View The Word Online!`)
        .setURL(def.urbanURL)
        .addField(`Definition`, `${def.definition}`.slice(0, 1000), false)
        .addField(`Definition In An Example`, `${def.example || 'none'}`.slice(0, 1000), false)
        .addField(`Author`, def.author, false)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    message.channel.send(embed)

}