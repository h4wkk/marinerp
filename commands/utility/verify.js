const generateCaptcha = require("../../handler/GenerateCaptcha")
const { MessageAttachment } = require('discord.js')

module.exports = {
    description: 'Sends the executing member a captcha!',
    aliases: ['verification'],
    usage: 'verify'
}

module.exports.run = async(client, message, args) => {
    const embed1 = new client.embed().setDescription(`Sorry! This server did not setup the verification role yet!`).setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    const embed2 = new client.embed().setDescription(`Sorry! You are already verified!`).setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))
    const vSettings = client.conf.verification
    if (!message.guild.roles.cache.get(vSettings.verifyRole)) return message.author.send(embed1).then((m) => m.delete({ timeout: 5000 })).catch(() => {})
    if (!client.channels.cache.has(vSettings.verifyChannel)) return console.log('[Error] Couldnt find verification channel, invalid id')
    if (!vSettings.enabled || (vSettings.verifyChannel && message.channel.id !== vSettings.verifyChannel)) return
    if (vSettings.verificationType === 'captcha') {
        const embed3 = new client.embed().setDescription(`Sorry! You are already started the verification process in your dms!`).setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))

        if (message.member.roles.cache.has(vSettings.verifyRole)) return message.author.send(embed2).then((m) => m.delete({ timeout: 5000 })).catch(() => {})
        if (client.processes.get(message.author.id)) return message.author.send(embed3).then((m) => m.delete({ timeout: 5000 })).catch(() => {})
        client.processes.set(message.author.id, true)
        await message.react("👍");

        let attempts = vSettings.Max_Attempts;
        const { image, text } = generateCaptcha(256, 128);
        const attachment = new MessageAttachment(image, "captcha.png");

        const embed = new client.embed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`- Please complete this captch to gain access to  **${message.guild.name}.**\n- Timer set for **5** minutes!\n- You have **${attempts}** attempts to pass the captcha!\n- If you experience any issues contact server staff.`)
            .attachFiles(attachment)
            .setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))
            .setImage("attachment://captcha.png")

        const msg = await message.author.send(embed)
        const collector = msg.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 300000, max: attempts });

        collector.on("collect", async(response) => {
            if (response.toString() !== text.toString()) {
                attempts--
                const failed = new client.embed()
                    .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`❌\` Failed to complete the captcha, please try again! You have **${attempts}** attempts left!`)
                    .setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))
                await msg.channel.send(failed);
                if (attempts === 0) {
                    client.processes.delete(message.author.id)
                    if (vSettings.kick_On_Max_Attempts) message.member.kick("User failed the captcha after 3 attempts!")
                    return
                }
            } else {
                await message.member.roles.add(vSettings.verifyRole).catch(() => {})
                message.member.roles.remove(vSettings.roleToRemove)
                client.processes.delete(message.author.id)
                const success = new client.embed()
                    .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Successfully passed the captcha! I have granted you access to ${message.guild.name}!`)
                    .setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))

                return msg.channel.send(success);
            }
        });
    } else if (vSettings.verificationType === 'command') {
        message.member.roles.add(vSettings.verifyRole)
        message.member.roles.remove(vSettings.roleToRemove)
    }
}