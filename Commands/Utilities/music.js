const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
	name: "music",
	description: "Music commands",
	usage: "/music <command>",
	cooldown: 5000,
	options: [
		{ name: "play", description: "Play a song", type: "SUB_COMMAND",
			options: [{name: "query", description: "The song to play", type: "STRING", required: true}],
		},
		{ name: "volume", description: "Change the volume", type: "SUB_COMMAND",
			options: [{name: "percent", description: "The volume to set (10 = 10%)", type: "NUMBER", required: true}],
		},
		{ name: "settings",	description: "Change the settings",	type: "SUB_COMMAND",
			options: [{name: "options", description: "The settings to change", type: "STRING", required: true, 
				choices: [
					{name: "▶️ | Now Playing", value: "now"},
					{name: "🔢 | View queue", value: "queue"},
					{name: "⏭️ | Skip", value: "skip"},
					{name: "⏸️ | Pause", value: "pause"},
					{name: "⏯️ | Resume", value: "resume"},
					{name: "⏹️ | Stop", value: "stop"},
					{name: "🔀 | Shuffle", value: "shuffle"},
					{name: "🔃 | Toogle autoplay", value: "autoplay"},
					{name: "🈁 | Add related song", value: "related"},
					{name: "🔁 | Repeat mode", value: "repeat"},
		]}],},
	],
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		const { options, member, guild, channel } = interaction;
		const VoiceChannel = member.voice.channel;
		
		if (!VoiceChannel)
			return interaction.reply({content: "You must be in a voice channel to use this command.", ephemeral: true});

		if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
			return interaction.reply({content: `You must be in the same voice channel as me to use this command (<#${guild.me.voice.channelId}>)`, ephemeral: true});

		try {
			switch (options.getSubcommand()) {
				case "play": {
					client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), {textChannel: channel, member: member});
					return interaction.reply({content: `🎼 Request recieved.`});
				}
				case "volume": {
					const volume = options.getNumber("percent");
					if (volume < 0 || volume > 100)
						return interaction.reply({content: `Volume must be between 0 and 100.`, ephemeral: true});
					client.distube.setVolume(VoiceChannel, volume);
					return interaction.reply({content: `🔊 Volume has been set to \`${volume}%\``});
				}
				case "settings": {
					const queue = await client.distube.getQueue(VoiceChannel);
					if (!queue) return interaction.reply({content: `⛔ There is no queue for this channel.`, ephemeral: true});

					switch (options.getString("options")) {
						case "skip": 
							await queue.skip(VoiceChannel);
							return interaction.reply({content: `⏭️ Song has been skipped.`});

						case "stop": 
							await queue.stop(VoiceChannel);
							return interaction.reply({content: `⏹️ Song has been stopped.`});
						
						case "pause": 
							await queue.pause(VoiceChannel);
							return interaction.reply({content: `⏸️ Song has been paused.`});
						
						case "resume": 
							await queue.resume(VoiceChannel);
							return interaction.reply({content: `▶️ Song has been resumed.`});
						
						case "shuffle":
							await queue.shuffle(VoiceChannel);
							return interaction.reply({content: `🔀 Song has been shuffled.`});

						case "autoplay":
							let autoplayMode = await queue.toggleAutoplay(VoiceChannel);
							return interaction.reply({content: `🔃 Autoplay mode is now \`${autoplayMode ? "On" : "Off"}\``});
						
						case "related":
							await queue.addRelatedSong(VoiceChannel);
							return interaction.reply({content: `🈁 A related song has been added.`});

						case "repeat":
							let repeatMode = await client.distube.setRepeatMode(queue);
							return interaction.reply({content: `🔁 Repeat mode is now \`${repeatMode = repeatMode ? repeatMode == 2 ? "Queue" : "Song" : "Off"}\``});

						case "now":
							const nowPlaying = await client.distube.getNowPlaying(VoiceChannel) || "Nothing";
							return interaction.reply({embed: [new MessageEmbed()
								.setColor("PURPLE")
								.setTitle(`Now playing:`)
								.setDescription(`${nowPlaying}`)
							]});

						case "queue": 
							return interaction.reply({embeds: [new MessageEmbed()
								.setColor("PURPLE")
								.setTitle(`${interaction.guild} Queue`)
								.setDescription(`${queue.songs.slice(0, 10).map(
									(song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]});
					}
					return;
				}
			}
		} catch (error) {
			const errorEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription(`⛔ Alert: \`${error}\``);
			return interaction.reply({embeds: [errorEmbed], ephemeral: true});
		}
	}
}