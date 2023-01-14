const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const {token} = require("./config.json");
const path = require("node:path");
const fs = require("node:fs");



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] }); // Create the client

client.commands = new Collection(); // Create the clients command list

const commandsPath = path.join(__dirname, "commands"); // Get the commands path
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")); // Get each js file in the commands directory

for(const file of commandFiles){ // Foreach command file
    const filePath = path.join(commandsPath, file); // get each command file path
    const command = require(filePath); // Open the file

    if("data" in command && "execute" in command){ // Check that command is proper
        client.commands.set(command.data.name, command); // Create the command
    } else { // Warn user
        console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.on('ready', () => { // On login
  console.log(`Logged in as ${client.user.tag}!`); // Print that client is logged in
  client.rest.on("rateLimited", console.log); // Alert when rate limited by Discord
});


// Command Events
client.on(Events.InteractionCreate, async interaction => { // On interaction
  if (!interaction.isChatInputCommand()) return; // Exit if its not a command interaction

  const command = interaction.client.commands.get(interaction.commandName); // Get command

  if(!command){ // This should never run because discord will not let incorrect commands be sent
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
  }

  try {
      await command.execute(interaction); // Run the execute function in the command
  } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true }); // Tell the user something went wrong
  }

});


client.login(token); // Login with the token
