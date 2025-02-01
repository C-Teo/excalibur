import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.commmands = new Collection();

// Getting the commands from our commands/ folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

console.log(commandFolders)

// client.login(process.env.DISCORD_TOKEN)