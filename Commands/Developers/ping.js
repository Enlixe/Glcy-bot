module.exports = {
	name: "ping",
	description: "Ping",
	usage: "/ping",
	// devsOnly: true,
	// permissions: [],
	// aliases: [],
	cooldown: 3000,
	// enabled: true,
	/**
     * @param {CommandInteraction} interaction
     */
	execute(interaction) {
		interaction.reply({ content: "POING" });
	},
};