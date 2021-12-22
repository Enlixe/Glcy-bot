const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require('discord.js');

const HentaiPackage = require("discord-hentai");
const Anime = HentaiPackage.Anime;

module.exports = {
    name: 'hentai',
    description: 'Get some juicy hentai.',
    usage: '/hentai <type>',
    cooldown: 5000,
    options: [{
        name: "hentai",
        description: "Type of hentai.",
        type: "STRING",
        required: true,
        choices: [{
                name: "Hentai",
                value: "hentai",
            },
            {
                name: "Thighs",
                value: "thighs",
            },
            {
                name: "Swimsuit",
                value: "swimsuit",
            },
            {
                name: "Hanal",
                value: "hanal",
            },
            {
                name: "Neko",
                value: "neko",
            },
            {
                name: "Kistsune",
                value: "kistsune",
            },
            {
                name: "Holo",
                value: "holo",
            },
            {
                name: "NekoGIF",
                value: "nekogif",
            },
            {
                name: "Lesbian",
                value: "lesbian",
            }
        ]
    }],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction) {
		await interaction.deferReply();
        const type = interaction.options.getString("hentai");
        const Embed = new MessageEmbed()
        // .setFooter(embeds.footer, embeds.icon)
        .setColor("#FF0000");

		// Check if the channel nsfw
		if (!interaction.channel.nsfw) {
			Embed.setTitle("Error!")
				.setDescription("This channel is not nsfw!")
				.setColor("#FF0000");
			return await interaction.editReply({embeds: [Embed]});
		}

        try {
            switch (type) {
                case "hentai": {
                    Embed.setImage(await Anime.hentai());
                    Embed.setTitle("Hentai.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "thighs": {
                    Embed.setImage(await Anime.thighs());
                    Embed.setTitle("Thighs.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "swimsuit": {
                    Embed.setImage(await Anime.swimsuit());
                    Embed.setTitle("Swimsuit.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "hanal": {
                    Embed.setImage(await Anime.hanal());
                    Embed.setTitle("Hanal.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "neko": {
                    Embed.setImage(await Anime.neko());
                    Embed.setTitle("Neko.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "kistsune": {
                    Embed.setImage(await Anime.kitsune());
                    Embed.setTitle("Kistsune.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "holo": {
                    Embed.setImage(await Anime.holo());
                    Embed.setTitle("Holo.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "nekogif": {
                    Embed.setImage(await Anime.nekoGif());
                    Embed.setTitle("Neko Gif.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }

                case "lesbian": {
                    Embed.setImage(await Anime.lesbian());
                    Embed.setTitle("Lesbian.");

                    return await interaction.editReply({
                        embeds: [Embed]
                    })
                }
            }
        } catch (err) {
            Embed.setColor("#FF9D00")
            Embed.setTitle("Error Occured.")
            Embed.setDescription(`The error is: ${err}`)

            return await interaction.editReply({
                embeds: [Embed]
            })
        }
    }
}