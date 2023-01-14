const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays and audiobook")
        .addAttachmentOption((option) => option
            .setName("mp3-file")
            .setDescription("Upload a file to play")
            .setRequired(true)),

    async execute(interaction) {
        const attachment = interaction.options.getAttachment("mp3-file");
        const name = attachment.url;

        console.log(name);


        function getChannelName(channel){
            return channel.name;
        }

        await interaction.reply("Pong!");
    },
};
