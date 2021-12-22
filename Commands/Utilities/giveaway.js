const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const ms = require("ms");

module.exports = {
	name: "giveaway",
	description: "Create a giveaway",
	usage: "/giveaway <type>",
	permissions: "ADMINISTRATOR",
	cooldown: 10000,
	options: [
		{
			name: "start",
			description: "Start the giveaway",
			type: "SUB_COMMAND",
			options: [
				{
					name: "duration",
					description: "The duration of the giveaway (1m, 1h, 1d)",
					type: "STRING",
					required: true
				},
				{
					name: "winners",
					description: "The amount of winners",
					type: "INTEGER",
					required: true
				},
				{
					name: "prize",
					description: "The prize of the giveaway",
					type: "STRING",
					required: true
				},
				{
					name: "channel",
					description: "The channel to send the giveaway to",
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT", "GUILD_NEWS"],
				}
			]
		},
		{
			name: "actions",
			description: "Actions for the giveaway",
			type: "SUB_COMMAND",
			options: [
				{
					name: "options",
					description: "Select an option",
					type: "STRING",
					required: true,
					choices: [
						{
							name: "end",
							value: "end"
						},
						{
							name: "pause",
							value: "pause"
						},
						{
							name: "resume",
							value: "resume"
						},
						{
							name: "reroll",
							value: "reroll"
						},
						{
							name: "delete",
							value: "delete"
						}
					]
				},
				{
					name: "message_id",
					description: "The message id of the giveaway",
					type: "STRING",
					required: true
				}
			]
		}
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	execute(interaction, client) {
		const { options } = interaction;

		const Sub = options.getSubcommand();

		const errorEmbed = new MessageEmbed()
		.setColor("RED");
		
		const successEmbed = new MessageEmbed()
		.setColor("GREEN");

		switch(Sub) {
			case "start": {
				const gchannel = options.getChannel("channel") || interaction.channel;
				const duration = options.getString("duration");
				const winnerCount = options.getInteger("winners");
				const prize = options.getString("prize");

				client.giveawaysManager.start(gchannel, {
					duration: ms(duration),
					winnerCount,
					prize,
					messages : {
						giveaway: "🎉 **GIVEAWAY STARTED** 🎉",
						giveawayEnded: "🎊 **GIVEAWAY ENDED** 🎊",
						winMessage: `Congratulations, {winners}! You won **{this.prize}**!`,
					}
				}).then(async () => {
					successEmbed.setDescription(`Giveaway was successfully started`);
					return interaction.reply({ embeds: [successEmbed], ephemeral: true });
				}).catch(async (err) => {
					errorEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
					return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				});
			}
			break;

			case "actions": {
				const choice = options.getString("options");
				const messageId = options.getString("message_id");
				const giveaway = 
					client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.prize === messageId) ||
					client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

				if (!giveaway) {
					errorEmbed.setDescription(`Could not find a giveaway with the message id ${messageId}`);
					return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				}

				switch(choice) {
					case "end": {
						client.giveawaysManager.end(messageId).then(() => {
							successEmbed.setDescription(`Giveaway has been ended`);
							return interaction.reply({ embeds: [successEmbed], ephemeral: true });
						}).catch((err) => {
							errorEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
							return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
						});
					}
					break;

					case "pause": {
						client.giveawaysManager.pause(messageId).then(() => {
							successEmbed.setDescription(`Giveaway has been paused`);
							return interaction.reply({ embeds: [successEmbed], ephemeral: true });
						}).catch((err) => {
							errorEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
							return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
						});
					}
					break;

					case "resume": {
						client.giveawaysManager.unpause(messageId).then(() => {
							successEmbed.setDescription(`Giveaway has been resumed`);
							return interaction.reply({ embeds: [successEmbed], ephemeral: true });
						}).catch((err) => {
							errorEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
							return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
						});
					}
					break;

					case "reroll": {
						client.giveawaysManager.reroll(messageId).then(() => {
							successEmbed.setDescription(`Giveaway has been rerolled`);
							return interaction.reply({ embeds: [successEmbed], ephemeral: true });
						}).catch((err) => {
							errorEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
							return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
						});
					}
					break;

					case "delete": {
						client.giveawaysManager.delete(messageId).then(() => {
							successEmbed.setDescription(`Giveaway has been deleted`);
							return interaction.reply({ embeds: [successEmbed], ephemeral: true });
						}).catch((err) => {
							errorEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
							return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
						});
					}
					break;
				}
			}
			break;

			default : {
				console.log("Error in giveaway command");
			}
		}
	}
}