const { MessageEmbed, Client } = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: "suggest",
	description: "Create a suggestion in an orginized matter.",
	usage: "/suggest <type> <title> <desc>",
	cooldown: 60000,
	options: [
		{
			name: "type",
			description: "Select the type.",
			required: true,
			type: "STRING",
			choices: [
				{
					name: "Command",
					value: "Command",
				},
				{
					name: "Event",
					value: "Event",
				},
				{
					name: "System",
					value: "System",
				},
			],
		},
		{
			name: "name",
			description: "Provide a name for your suggestion.",
			type: "STRING",
			required: true,
		},
		{
			name: "description",
			description: "Describe the suggestion.",
			type: "STRING",
			required: true,
		},
	],
	/**
     * @param {CommandInteraction} interaction
	 * @param {Client} client
     */
	async execute(interaction, client) {
		const { options } = interaction;

		const type = options.getString("type");
		const name = options.getString("name");
		const description = options.getString("description");

		const response = new MessageEmbed()
			.setColor("AQUA")
			.setDescription(`**${interaction.member} has suggested a** \`${type}\``)
			.addField("Name", `${name}`, true)
			.addField("Description", `${description}`, true);

		const message = await interaction.reply({ embeds: [response], fetchReply: true });
		message.react("<:like:813322569523920946>");
		message.react("<:dislike:813322644509556756>");

		// wait 3 sec
		await wait(3000);
		client.users.cache.get('524805915526955048').send({ embeds: [response] });
	},
};