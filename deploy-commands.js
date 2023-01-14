const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");

const commands = []; // List of commands to setup

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); // Get every js file in the commands directory

for(const file of commandFiles) { // For each file
    const command = require(`./commands/${file}`); // Open the file
    commands.push(command.data.toJSON()); // Store the command data to the commands list
}

const rest = new REST({ version: "10" }).setToken(token); // Setup REST API

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), // Refresh all commands
            { body: commands },
        );
        console.log(`Succesfully reloaded ${data.length} application (/) commands.`);

    } catch(error) {
        console.error(error); // Catch and rethrow
    }

})();
