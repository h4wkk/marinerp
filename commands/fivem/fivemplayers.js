const { chunk } = require('lodash')

module.exports = {
    description: 'View all the players on the server!',
    aliases: ['fivemp'],
    usage: 'fivemplayers <server ip>'
}

module.exports.run = async(client, message, args) => {

    let data = await require('node-fetch')(`http://${args[0]}/players.json`).then(r => r.json()).catch(() => {})

    if (!data) return message.channel.send(new client.embed().setDescription('You need to enter a valid FiveM server ip'))
    let players = chunk(data.map((a, i) => `Player ${i + 1}: ${a.name}`), 10)

    const embed = new client.embed()
        .setTitle(`FiveM Players on ip ${args[0]}`)
        .setDescription(players[0].join('\n'))
        .setFooter(`Pages 1/${players.length}`)

    message.channel.send(embed).then(async emb => {
        if (!players[1]) return;
        ['⏮️', '◀️', '▶️', '⏭️', '⏹️', '🔢'].forEach(async m => await emb.react(m))

        const filter = (_, u) => u.id === message.author.id
        const collector = emb.createReactionCollector(filter, { time: 300000 })
        let page = 1
        collector.on('collect', async(r, user) => {
            let current = page;
            emb.reactions.cache.get(r.emoji.name).users.remove(user.id)
            if (r.emoji.name === '◀️' && page !== 1) page--;
            else if (r.emoji.name === '▶️' && page !== players.length) page++;
            else if (r.emoji.name === '⏮️') page = 1
            else if (r.emoji.name === '⏭️') page = players.length
            else if (r.emoji.name === '⏹️') return collector.stop()
            else if (r.emoji.name === '🔢') {
                let msg = await message.channel.send('What page would you like to flip to?')
                let collector = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content <= players.length, { max: 1, time: 8000 })
                msg.delete()
                if (collector.first() && collector.first().content > 0 && collector.first().content <= players.length) page = collector.first().content
            }

            embed.setDescription(players[page - 1].join('\n'))
            if (current !== page) emb.edit(embed.setFooter(`Pages ${page}/${players.length}`))
        })
    })
}