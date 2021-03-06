const { random } = require('lodash')

module.exports = {
    description: 'Picks a random number from 1-100.',
    aliases: ['rand'],
    usage: 'randomnumber <min>-<max> [amount]'
}

module.exports.run = async(client, message, args) => {
    const inp = (args[0] || '').split('-').map(Number)
    if (!inp[0] || !inp[1] || isNaN(inp[0]) || isNaN(inp[1]) || args[0] >= args[1]) return message.channel.send(new client.embed().setDescription('You need to enter what numbers I generate between!\nExample: `rand 1-10`').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    if (!isNaN(args[1]) && args[1] > 100) args[1] = 1000
    nums = new Array(!isNaN(args[1]) ? parseInt(args[1]) : 1).fill(0).map(() => random(inp[0], inp[1]))
    message.channel.send(nums.join(', ').slice(0, 2000))
}