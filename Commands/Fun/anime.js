const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const anime = require("anime-actions");
const axios = require("axios");
module.exports = { 
    name: 'anime', 
    description: 'Get some gifs, picture, and sentence from an anime character',
	usage: '/anime <actions>',
    cooldown: 5000,
	options: [
		{
			name: 'anime',
			description: 'Get some anime actions',
			type: 'STRING',
			required: true,
			choices: [
				{ name: "baka", description: "Send a baka gif", value: "baka" },
				{ name: "dance", description: "Send a dance gif", value: "dance" },
				{ name: "bite", description: "Send a bite gif", value: "bite" },
				{ name: "blush", description: "Send a blush gif", value: "blush" },
				{ name: "bonk", description: "Send a bonk gif", value: "bonk" },
				{ name: "cuddle", description: "Send a cuddle gif", value: "cuddle" },
				{ name: "hug", description: "Send a hug gif", value: "hug" },
				{ name: "quote", description: "Send a quote from an anime character", value: "quote" },
				{ name: "sad", description: "Send a sad gif", value: "sad" },
				{ name: "slap", description: "Send a slap gif", value: "slap" },
				{ name: "waifu", description: "Send a waifu gif", value: "waifu" },
				{ name: "wallpaper", description: "Send an anime wallpaper", value: "wallpaper" },
			],
		},
	],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
		await interaction.deferReply();

        const actions = interaction.options.getString("anime");
        const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

        try {
            switch (actions) {
                case "baka" : {
                    embed.setAuthor("Baka! >,<", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.baka())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "bite" : {
                    embed.setAuthor("Yummy~ 🦷", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.bite())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "blush" : {
                    embed.setAuthor("Shy~ (/▽＼)", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.blush())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "bonk" : {
                    embed.setAuthor("Bonk! 🪓😡", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.bonk())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "cuddle" : {
                    embed.setAuthor("Ahh yes~ §(*￣▽￣*)§", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.cuddle())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "dance" : {
                    embed.setAuthor("Letsgoo~ 💃🕺", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.dance())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "hug" : {
                    embed.setAuthor("So comfy~ (∪.∪ )...zzz", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.hug())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "quote" : {
                    const r1 = await axios.get(`https://some-random-api.ml/animu/quote`);

                    embed.setAuthor("Anime quotes <3!", client.user.avatarURL({ format: "png" }))
                    .addFields(
                        {
                            name: "Character",
                            value: `${r1.data.character}`,
                            inline: true
                        },
                        {
                            name: "Anime",
                            value: `${r1.data.anime}`,
                            inline: true
                        }, 
                        {
                            name: "Sentence",
                            value: `${r1.data.sentence}`
                        }
                    )
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "sad" : {
                    embed.setAuthor("Crying~ 😢", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.cry())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "slap" : {
                    embed.setAuthor("You naughty!! 😡🤚", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.slap())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "waifu" : {
                    embed.setAuthor("Here's your waifu 💘", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.smile())
                    return await interaction.editReply({ embeds: [embed] })
                }
                case "wallpaper" : {
                    embed.setAuthor("Here's your wallpaper 🖼", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.wallpaper())
                    return await interaction.editReply({ embeds: [embed] })
                }
            }
        } catch (e) {
            embed.setTitle("⚠ An error occurred ⚠")
				.setColor("YELLOW")
				.setDescription(`${e}`)
				.setFooter("🔍")
				.setTimestamp();
			interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}