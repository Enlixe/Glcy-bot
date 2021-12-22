/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const { Perms } = require('../Validation/Permissions');

const config = require('../config.json');

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
    const table = new Ascii('Commands Loaded');

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/**/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return table.addRow(
                file.split('/')[6],
                '🔸 Failed',
                'Missing a name.'
            );

        if (!command.type && !command.description)
            return Table.addRow(
                command.name,
                '🔸 FAILED',
                'Missing a description.'
            );

        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return table.addRow(
                    command.name,
                    '🔸 Failed',
                    'Permission is invalid.'
                );
        }

		if (!command.type && !command.description)
            return Table.addRow(
                command.name,
                '🔹 Successful',
                'Missing a cooldown.'
            );

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await table.addRow(command.name, '🔹 Successful');
    });

    console.log(table.toString());

    // PERMISSIONS CHECK //
    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get(config.mainGuild);

        mainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find(
                    (c) => c.name === commandName
                ).permission;
                if (!cmdPerms) return null;

                return mainGuild.roles.cache
                    .filter((r) => r.permissions.has(cmdPerms) && !r.managed)
                    .first(10);
            };

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: 'ROLE', permission: true }];
                }, []);

                return [...accumulator, { id: r.id, permissions }];
            }, []);

            await mainGuild.commands.permissions.set({ fullPermissions });
        });
    });
};
