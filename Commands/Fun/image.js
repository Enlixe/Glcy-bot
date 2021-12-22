const { CommandInteraction, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: "image",
    description: "Image manipulation command.",
    usage: "/image <user> <actions>",
    cooldown: 5000,
    options: [
        {
            name: "target",
            description: "Select a target.",
            type: "USER",
            required: true
        },
        {
            name: "image",
            description: "Select the type of image filter.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "rip",
                    value: "rip"
                },
                {
                    name: "trash",
                    value: "trash"
                },
                {
                    name: "rainbow",
                    value: "rainbow"
                },
                {
                    name: "sepia",
                    value: "sepia"
                },
                {
                    name: "shit",
                    value: "shit"
                },
                {
                    name: "slap",
                    value: "slap"
                },
                {
                    name: "spank",
                    value: "spank"
                },
                {
                    name: "triggered",
                    value: "triggered"
                },
                {
                    name: "wanted",
                    value: "wanted"
                },
                {
                    name: "wasted",
                    value: "wasted"
                },

            ],

        }
    ],
    /** 
     * @param {CommandInteraction} interaction  
     */
    async execute(interaction) {
		await interaction.deferReply();
        const { options } = interaction
        const loltarget = options.getMember("target");
        const choices = interaction.options.getString("image");

        switch(choices) {
            case "rip" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.rip(avatar);
       
                const attachment = new MessageAttachment(image, "rip.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "trash" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.trash(avatar);
       
                const attachment = new MessageAttachment(image, "trash.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "rainbow" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.rainbow(avatar);
       
                const attachment = new MessageAttachment(image, "rainbow.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "sepia" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.sepia(avatar);
       
                const attachment = new MessageAttachment(image, "sepia.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "shit" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.shit(avatar);
       
                const attachment = new MessageAttachment(image, "shit.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "slap" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.slap(interaction.user.displayAvatarURL({ format: "png"}), avatar);
       
                const attachment = new MessageAttachment(image, "slap.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "spank" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.spank(interaction.user.displayAvatarURL({ format: "png"}), avatar);
       
                const attachment = new MessageAttachment(image, "spank.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "triggered" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.trigger(avatar);
       
                const attachment = new MessageAttachment(image, "triggered.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "wanted" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.wanted(avatar);
       
                const attachment = new MessageAttachment(image, "wanted.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
            case "wasted" : {
                const avatar = loltarget.displayAvatarURL({ format: 'png' });

                const image = await Canvas.wasted(avatar);
       
                const attachment = new MessageAttachment(image, "wasted.gif");
       
                return await interaction.editReply({ files: [attachment]});
            }
            break;
        };
    }
};