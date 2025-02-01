import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'

dotenv.config()

async function getCommandFiles() {
    const commands = []
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename)
    const commandsFolderPath = path.join(__dirname, 'commands');
    const commandsFiles = fs.readdirSync(commandsFolderPath).filter(file => file.endsWith('.js'));

    for (const file of commandsFiles) {
        const filePath = path.join(commandsFolderPath, file);
        const fileURL = pathToFileURL(filePath).href
        const command = await import(fileURL);
        if ('data' in command.default && 'execute' in command.default) {
            commands.push(command.default)
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }

    return commands;
}

// I don't enjoy JavaScript... it has no main function
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

const commands = await getCommandFiles();
client.commands = new Collection();

for (const command of commands) {
    client.commands.set(command.data.name, command)
}

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction)
})

// client.login(process.env.DISCORD_TOKEN)