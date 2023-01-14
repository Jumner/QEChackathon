const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {

        function getChannelName(channel){
            return channel.name;
        }

        await interaction.reply("Pong!");
    },
};
