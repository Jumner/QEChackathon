const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays and audiobook"),
    async execute(interaction) {

        function getChannelName(channel){
            return channel.name;
        }

        await interaction.reply("Pong!");
    },
};
