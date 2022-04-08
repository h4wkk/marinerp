const { random, shuffle } = require('lodash')
const rand = require('random-words')
const games = new Map()

module.exports = {
    description: 'Play a game of scramble!',
    aliases: [`scram`],
    usage: 'scramble'
}

module.exports.run = (client, message, args) => {

    if (games.get(message.channel.id))
        return message.channel.send(`There is already a game of scramble playing in this channel, the word is ${games.get(message.channel.id)}`)

    let word = rand()
    let scrambled = shuffle(word).join('')

    message.channel.send(`The word is ${scrambled}! You have 1 minute to guess the answer!`).then(async() => {
        games.set(message.channel.id, scrambled)

        message.channel.awaitMessages(response => response.content.toLowerCase() === word.toLowerCase(), { max: 1, time: 60000 }).then(msg => {
            if (msg.size) {
                let prize = random(10, 20)
                message.channel.send(`${msg.first().author.username} got the correct answer! You were given ${prize} ${message.coin}!`)
                client.members.math(message.guild.id, '+', prize, `${msg.first().author.id}.balance.wallet`)
            } else message.channel.send(`Nobody got it! The word was ${word}`)

            games.delete(message.channel.id)
        })
    })
}