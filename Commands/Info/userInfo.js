const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Displays the userinfo of the specified target.",
    usage: "/userinfo <user>",
    cooldown: 10000,
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();
        
        const response = new MessageEmbed()
            .setColor(target.user.accentColor || "RANDOM")
            .setAuthor(target.user.tag, target.user.avatarURL({dynamic: true}))
            .setThumbnail(target.user.avatarURL({dynamic: true}))
            .setImage(target.user.bannerURL({dynamic: true, size: 512}) || "")
            .addFields(
                {name: "ID", value: target.user.id},
                {name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true},
                {name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true},
                {name: "Roles", value: target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"},
                {name: "Accent Colour", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None"},
                {name: "Banner", value: target.user.bannerURL() ? "** **" : "None"}
            );
            
        interaction.reply({embeds: [response], ephemeral: false})
    }
}