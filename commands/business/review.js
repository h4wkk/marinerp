const { chunk } = require('lodash')

module.exports = {
    description: 'Lets your clients leave a review on products.',
    aliases: ['rev'],
    usage: 'review'
}

module.exports.run = async(client, message, args) => {
    const reviews = client.conf.business.Review_Products

    if (args[0] === 'list') {
        const rvs = chunk(reviews.map((a, i) => `**Product ${i + 1}:** ${a.name}`), 5)
        const embed = new client.embed()
            .setTitle('Application Menu')
            .setDescription(`To review a product, run \`${message.px}review <product name>\`\nUse the reactions to flip pages\n\n${rvs[0].join('\n')}\n\u200b`)
            .setFooter(`Pages 1/${rvs.length}`)

        if (!reviews.length) return message.channel.send('There arent any products on the server for you to review!')

        return message.channel.send(embed).then(async emb => {
            if (!rvs[1]) return;
            ['⏮️', '◀️', '▶️', '⏭️', '⏹️'].forEach(async m => await emb.react(m))

            const filter = (_, u) => u.id === message.author.id
            const collector = emb.createReactionCollector(filter, { time: 300000 })
            let page = 1
            collector.on('collect', async(r, user) => {
                let current = page;
                emb.reactions.cache.get(r.emoji.name).users.remove(user.id)
                if (r.emoji.name === '◀️' && page !== 1) page--;
                else if (r.emoji.name === '▶️' && page !== rvs.length) page++;
                else if (r.emoji.name === '⏮️') page = 1
                else if (r.emoji.name === '⏭️') page = rvs.length
                else if (r.emoji.name === '⏹️') return collector.stop()

                embed.setDescription(`To review a product, run \`${message.px}review <product name>\`\nUse the reactions to flip pages\n\n${rvs[page - 1].join('\n')}\n\u200b`)
                if (current !== page) emb.edit(embed.setFooter(`Pages ${page}/${rvs.length}`))
            })
        })
    }

    const answers = []
    const filter = m => m.author.id === message.author.id
    const collector = message.channel.createMessageCollector(filter, { time: 60000 })
    const product = client.conf.business.Review_Products.find(s => s.name.toLowerCase() === args.join(' ').toLowerCase())
    if (!reviews.length) return message.channel.send(new client.embed().setDescription('Sorry but there arent any open products to review on the server!'))
    if (!product) return message.channel.send(new client.embed().setDescription(`Sorry but i couldnt find a product with that name on the server!\nUse \`${message.px}review list\` to view all the available products to review`))

    const channel = client.channels.cache.get(product.channel)

    if (!channel) return message.channel.send(new client.embed().setDescription('Sorry but i couldnt find that products review channel!'))
    message.channel.send('Please Type Your Review!')

    collector.on('collect', m => {
        if (!answers[0]) {
            answers.push(m.content)
            message.channel.send('How many stars you would you rate this product? Please send in chat 1-5');
        } else if (!answers[1]) {
            if (isNaN(m.content) || m.content > 5 || m.content < 1) return message.channel.send('Your star rating must be from 1-5')
            answers.push(Number(m.content))
            message.channel.send(`Please Type Why You Gave ${answers[1]} stars!`)
        } else {
            message.channel.send('Your review has been completed.')

            const embed = new client.embed()
                .setAuthor(`Review Submitted by ${message.author.tag}`)
                .addField('Product', args.join(' '), false)
                .addField('Review', answers[0], false)
                .addField('Stars', ':star:'.repeat(answers[1]), false)
                .addField('Reason', m.content, false)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: false }))
                .setFooter(`Review By ${message.author.tag} |  ${answers[1]} Stars  |  Made By Fuel#2649`, message.author.displayAvatarURL({ dynamic: true }))

            channel.send(embed);
            collector.stop()
        }
    })

    collector.on('end', () => !answers[1] ? message.channel.send('You ran out of time!') : '')
}