const randomPuppy = require('random-puppy');
module.exports = {
    description: 'Lets you see the last deleted message.',
    aliases: ['snip3'],
    usage: 'snipe'
}

module.exports.run = async(client, message, args) => {
    let embed3 = new client.embed()
        .setDescription(`Theres nothing to snipe :/`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    let snipe = client.snipes.get(message.channel.id)
    if (!snipe || !snipe.content) return message.channel.send(embed3)
    let user = await client.users.fetch(snipe.user)
    const embed = new client.embed()
        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png' }))
        .setTimestamp()
        .setTitle(`I have sniped ${user.tag}\'s message!`)
        .setDescription(`The last deleted message said: \`\`\`${snipe.content}\`\`\``)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))

    message.channel.send(`I have sniped this users message!`)
    message.channel.send(embed);

}