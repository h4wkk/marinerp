const axios = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
    description: 'Allows you to see someones instagram.',
    aliases: ['invs', 'invs'],
    usage: 'invites'
}

module.exports.run = async(client, message, args) => {
    if (!args[0]) { return message.channel.send(new client.embed().setDescription(`Please provide me a username to look up!`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true }))); }
    let url, response, account, details;
    try {
        url = `https://instagram.com/${args[0]}/?__a=1`;
        response = await axios.get(url)
        account = response.data
        details = account.graphql.user
    } catch (error) {
        return message.channel.send(new client.embed().setDescription(`Sorry! Thats not a account you dumbass.`).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    }

    const embed = new client.embed().setTitle(`${details.username}`).setDescription(`**Bio:**\n${details.biography}`).setThumbnail(details.profile_pic_url).setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })).addField(`Followers:`, details.edge_followed_by.count.toLocaleString(), ).addField(`Following`, details.edge_follow.count.toLocaleString(), ).addField(`Total Posts:`, details.edge_owner_to_timeline_media.count.toLocaleString(), ).addField(`Private:`, `${details.is_private ? 'Yes' : 'No'} `)
    await message.channel.send(embed)

}