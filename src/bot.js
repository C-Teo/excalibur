import dotenv from 'dotenv'
import { Client, Events, GatewayIntentBits } from 'discord.js'

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.login(process.env.DISCORD_TOKEN)