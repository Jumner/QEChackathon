const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    // Command to kill the bot (used for development)
    data: new SlashCommandBuilder()
        .setName("commerce") // command is /commerce
        .setDescription("Kill the bot"),
    async execute(interaction) { // On command run
        await interaction.reply("dies of cringe"); // Reply to the command
        throw new Error("Commerce Cringe"); // Kill the program and exit
    },
};
