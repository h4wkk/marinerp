module.exports = {
    description: 'Allows you to see how many invites you have.',
    aliases: ['invs', 'invs'],
    usage: 'invites'
}

module.exports.run = async(client, message, args) => {
    let member = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => {});
    if (!member) return message.channel.send(new client.embed().setDescription('Sorry, I can\'t seem to find this user!').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));

    let userInvites = (await message.guild.fetchInvites()).find(invite => invite.inviter.id === member.id);
    let FuelInvites = userInvites ? userInvites.uses : 0;

    message.channel.send(new client.embed().setDescription(`${member}'s invite count is \`${FuelInvites}\` `).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })));
}