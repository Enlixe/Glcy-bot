const { Events } = require('../Validation/EventNames');

module.exports = async (client, PG, Ascii) => {
    const table = new Ascii('Events Loaded');

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!Events.includes(event.name) || !event.name) {
            const L = file.split('/');
            await table.addRow(
                `${event.name || 'MISSING'}`,
                `✘ Event name is either invalid or missing: ${
                    L[6] + `/` + L[7]
                }`
            );
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) =>
                event.execute(...args, client)
            );
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }

        await table.addRow(event.name, '✔ SUCCESSFUL');
    });

    console.log(table.toString());
};
