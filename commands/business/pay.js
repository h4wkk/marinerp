module.exports = {
    description: 'Lets you send a payment request to the buyer.',
    aliases: ['payme', 'reqpayment'],
    usage: 'pay <product name> | <Price>'
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new client.embed().setDescription(`Sorry you are missing the permission \`MANAGE_MESSAGES\`!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    let [product, price] = args.join(' ').split(/\s*\|\s*/)
    if (!price) return message.channel.send(new client.embed().setDescription(`You are missing the price, you need to do \`${message.px}pay <ProductName> | <ProductPrice>\``).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))

    const embed = new client.embed()
        .setTitle(`Payment Request!`)
        .addField(`Product`, product)
        .addField(`Price`, `$${price}`)
        .addField(`Paypal`, `[Click Me!](${client.conf.purchaseSystem.Paypal_Email})`)
        .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    message.channel.send(embed)

}