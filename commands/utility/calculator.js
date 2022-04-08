const { evaluate } = require('mathjs')

module.exports = {
    description: 'Does your math homework for you!',
    aliases: ['solve', 'math'],
    usage: 'calculator <Problem>'
}

module.exports.run = async(client, message, args) => {
    const dumbo = ['Why are you so dumb?', 'How many classes did you fail?', 'Will you ever be smart?', 'Do you even know math or are you helping a kid?', 'Can I teach you math?', 'Are your parents disappointed in you?']
    try {
        message.channel.send(new client.embed().setTitle('Here dumbo cant do basic math huh?')
            .addField('Dumby Equation', '```\n' + args.join(' ') + '```')
            .addField('My Amazing Answer', '```\n' + evaluate(args.join(' ')) + '```')
            .addField('My Question For You', `\`\`\`${dumbo[~~(Math.random() * dumbo.length)]}\`\`\``)
            .setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    } catch (e) {
        message.channel.send(new client.embed().setDescription('Please provide me an equation.').setFooter(`${message.guild.name} | Made By Fuel#2649`, message.guild.iconURL({ dynamic: true })))
    }
}