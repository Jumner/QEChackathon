const { Client, GatewayIntentBits } = require('discord.js');
const {token} = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if("data" in command && "execute" in command){
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.rest.on("rateLimited", console.log);
});





client.login(token);
