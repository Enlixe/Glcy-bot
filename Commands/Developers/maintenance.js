const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "maintenance",
    description: "Only for bot owner.",
    usage: "/maintenance",
    permissions: ["ADMINISTRATOR"],
    devsOnly: true,
    cooldown: 5000,
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (client.maintenance === false && interaction.user.id == "524805915526955048") {
            
            client.maintenance = true;
            
            const bot = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Maintenance mode **enabled** ✅")
                .setDescription(`👷‍♂️ The bot has been put into maintenance mode. 👷‍♂️`)
                .setTimestamp()
            
            log.log(`EnlX > Maintenance | ✅ Enabled by ${interaction.user.tag}`);
                
            return interaction.reply({ embeds: [bot], fetchReply: true })//.then(msg => { setTimeout(() => msg.delete(), 5000) })

        }

        if (client.maintenance && interaction.user.id == "524805915526955048"){
            
            client.maintenance = false;

            const bot = new MessageEmbed()
                .setColor("RED")
                .setTitle("Maintenance mode **disabled** ⛔")
                .setDescription(`👷‍♂️ The bot has been taken out of maintenance mode. 👷‍♂️`)
                .setTimestamp()

            log.log(`EnlX > Maintenance | ❎ Disabled by ${interaction.user.tag}`);

            return interaction.reply({ embeds: [bot], fetchReply: true })//.then(msg => { setTimeout(() => msg.delete(), 5000) })

        }
        return;
    }
}