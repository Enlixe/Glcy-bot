const mongoose = require("mongoose");
const Database = process.env.DBURL;

module.exports = {
	name: "ready",
	once: true,
	/**
     * @param {Client} client
     */
	execute(client) {
		log.info('EnlX > Bot is ready');

		setInterval(() => {
            if (client.maintenance) {
                client.user.setStatus("dnd")
                client.user.setActivity("Maintenance")
                return
            }
            if (!client.maintenance) {
                client.user.setStatus("online")

				const activites = [
					{name: `${client.guilds.cache.size} servers!`, type: "WATCHING"},
					{name: `${client.users.cache.size} users!`, type: "LISTENING"},
					{name: `Development`, type: "PLAYING"},
					{name: `Anime`, type: "WATCHING"},
				]
				let activity = 0
				client.user.setPresence({status: "online", activity: activites[0]})
				setInterval(() => {
					if(activity === activity.length) return activity = 0;
					activity++
					client.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
				}, 1000 * 60);
            }
        }, 30000);

		// ========================================================
		//* Database Connection
		log.info("EnlX > Database | ~ Connecting to database...");
		if (!Database) return log.warn("EnlX > Database | ✘ No database url provided, some features may not work");
		mongoose.connect(Database, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).then(() => {
			log.info("EnlX > Database | ✔ Connected to database!");
		}).catch((err) => {
			console.log(err);
		});
		// ========================================================
	},
};