const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	/**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
	async execute(interaction, client) {

		// ================================
		// Maintenance check
		// ================================
		if (client.maintenance && interaction.user.id != "524805915526955048") {
            const Response = new MessageEmbed()
            .setTitle("👷‍♂️ MAINTENANCE 👷‍♂️")
            .setDescription("Sorry the bot will be back shortly when everything is working correctly.")
            .setColor("DARK_BUT_NOT_BLACK")

            return interaction.reply({embeds: [Response]})
        }
		// ================================

		if (interaction.isCommand() || interaction.isContextMenu()) {

			// ================================
			// Cooldown System
			// ================================
			const { cooldown } = require("../../Structures/index");
			const cmd = client.commands.get(interaction.commandName);
			if (cmd) {
				if (cmd.cooldown) {
					const cooldwn = cooldown.get(`${cmd.name}${interaction.user.id}`) - Date.now();
					const mth = Math.floor(cooldwn / 1000) + "";
					if (cooldown.has(`${cmd.name}${interaction.user.id}`))
						return interaction.reply({
							embeds: [ new MessageEmbed().setColor("RED").setDescription(
								`You are on a cooldown. Try this command again in \`${mth.split(".")[0]}\` seconds`
							) ],
							ephemeral: true,
						});
					cooldown.set( `${cmd.name}${interaction.user.id}`, Date.now() + cmd.cooldown );
					setTimeout(() => { cooldown.delete(`${cmd.name}${interaction.user.id}`) }, cmd.cooldown);
				}
			}
			// ================================

			const command = client.commands.get(interaction.commandName);
			if (!command) {
				return interaction.reply({ embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("⛔ An error occured while running this command."),
				] }).then(client.commands.delete(interaction.commandName)).then(console.log(`EnlX > Command "${interaction.commandName}" was deleted because it was invalid`));
			}

			// ================================
			// Devs only
			// ================================
			const { devs } = require("../../Structures/config.json");
			if(command.devsOnly === true) {  
				if(!devs.includes(interaction.member.id)) return interaction.reply({ content: "You can't use this command!", ephemeral: true});
			}

			command.execute(interaction, client);
		}
	},
};