const Enmap = require('enmap')
const duration = require('humanize-duration')
const parse = require('parse-duration')
const lastDaily = new Map(),
    streak = new Enmap(),
    daily = new Map()

module.exports = {
    description: 'Claim that daily reward of yours.',
    aliases: [],
    usage: 'balance [@User]'
}

module.exports.run = async(client, message, args) => {
    const cooldown = daily.get(message.guild.id + message.author.id)
    const settings = client.conf.economy
    if (cooldown) return (await message.channel.send(new client.embed().setDescription(`Come back in ${duration(cooldown - Date.now(), { round: true })} to claim another daily reward`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))).delete({ timeout: 8000 }))

    const current = streak.ensure(message.guild.id + message.author.id, 1)
    if (lastDaily.get(message.guild.id + message.author.id) > Date.now()) streak.set(message.guild.id + message.author.id, current + 1)
    else streak.set(message.guild.id + message.author.id, 1)

    let amt = 50 * streak.get(message.guild.id + message.author.id)

    const embed = new client.embed()
        .setDescription(`You claimed your daily reward of ${amt} ${message.coin}, and you have a streak of ${streak.get(message.guild.id + message.author.id)}!\nCome back in ${duration(parse(settings.dailyWaitTime), { round: true })} for another reward!`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    message.channel.send(embed)

    client.members.math(message.guild.id, '+', amt, `${message.author.id}.balance.wallet`)

    daily.set(message.guild.id + message.author.id, Date.now() + parse(settings.dailyWaitTime))
    lastDaily.set(message.guild.id + message.author.id, Date.now() + parse(settings.dailyWaitTime) * 2)
    setTimeout(() => daily.delete(message.guild.id + message.author.id), parse(settings.dailyWaitTime))
}