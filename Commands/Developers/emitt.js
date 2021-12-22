module.exports = {
	name: "emitt",
	description: "Event emitter",
	usage: "/emitt <sendWhat>",
	permission: "ADMINISTRATOR",
	devsOnly: true,
	cooldown: 10000,
	options: [
		{
			name: "events",
			description: "Guild Events.",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "guildMemberAdd",
					value: "guildMemberAdd",
				},
				{
					name: "guildMemberRemove",
					value: "guildMemberRemove",
				},
				{
					name: "boosting",
					value: "boosting",
				},
			],
		},
	],
	/**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
	execute(interaction, client) {
		const choices = interaction.options.getString("member");

		switch (choices) {
			case "guildMemberAdd" : {
				client.emit("guildMemberAdd", interaction.member);
				interaction.reply({ content: "Emmited the event.", ephemeral: true });
			}
				break;
			case "guildMemberRemove" : {
				client.emit("guildMemberRemove", interaction.member);
				interaction.reply({ content: "Emmited the event.", ephemeral: true });
			}
				break;
		}
	},
};