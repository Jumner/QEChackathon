const { SlashCommandBuilder } = require("discord.js");
const { playMp3File } = require("../tools.js");

module.exports = {
    // Play an audiobook
    data: new SlashCommandBuilder()
        .setName("play") // Command is /play
        .setDescription("Plays and audiobook")
        .addAttachmentOption((option) => option // Let user attach an mp3 file
            .setName("mp3-file") // Id to grab the attachment later
            .setDescription("Upload a file to play") // Tell user to upload an mp3
            .setRequired(true)), // Upload is required

    async execute(interaction) { // On command run
        const attachment = interaction.options.getAttachment("mp3-file"); // get the attachment using the id
        const url = attachment.url; // Grab its url
        playMp3File(interaction.member, url); // Play the url

        await interaction.reply("Now Playing!"); // Tell the user that the bot is working
    },
};
