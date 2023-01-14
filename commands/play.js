const { SlashCommandBuilder } = require("discord.js");
const { playMp3File } = require("../tools.js");

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
        const url = attachment.url;
        playMp3File(interaction.member, url);

        await interaction.reply("Pong!");
    },
};
