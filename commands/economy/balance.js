module.exports = {
    description: 'Check your balance on the server.',
    aliases: ['bal'],
    usage: 'balance [@User]'
}

module.exports.run = async(client, message, args) => {
    const user = message.mentions.users.first() || message.author
    const data = client.members.ensure(message.guild.id, client.memberSettings, user.id).balance

    message.channel.send(`${user.id === message.author.id ? 'Your' : user.tag + '\'s'} wallet has **${data.wallet}** ${message.coin}!\nTheir bank balance is **${data.bank}** ${message.coin}!`)
}