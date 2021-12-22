const { MessageEmbed, Client } = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "messageCreate",

    /**
     * @param {Client} client
     */
    async execute(message, client) {
        if (message.author.bot) return;
        // ========================================================
        //* DM Logger
        if (!message.guildId) {
            const logs = new MessageEmbed()
            .setTitle("New DM")
            .setColor("GREEN")
            .addField("Time:", `<t:${parseInt(message.createdTimestamp / 1000)}:R> at <t:${parseInt(message.createdTimestamp / 1000)}:t>`)
            .addField("User:", `${message.author}\n||${message.author.tag} | ${message.author.id}||`)
            .addField("Message:", `\`\`\`${message.content}\`\`\``)

            log.log(`EnlX > DMLogger | New DM from ${(message.author.tag).toString()} | ${message.author.id}`);
            //* wait 3 sec
            await wait(3000);
            client.users.cache.get('524805915526955048').send({ embeds: [logs] });
        };
        // ========================================================
    }
}