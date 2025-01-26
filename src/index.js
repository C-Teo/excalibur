import dotenv from 'dotenv'
import { google } from 'googleapis'
import { Client, GatewayIntentBits } from 'discord.js'
import { sheets, spreadsheet } from "./api/google/client.js"

dotenv.config()

const auth = new google.auth.GoogleAuth({
    keyFile: '../config/secrets.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

try {
    const table = (await spreadsheet(
        await sheets(auth),
        "1Cqq_EFGj8I3shKUckN50gdCgf84YeqWF3Esd8Uo4VV8",
        "Sheet1!A1:D6",
    )).data.values 

    const headers = table[0];

    for (let i = 1; i < table.length; i++) {
        console.log(table[i]);
    }
} catch (error) {
    console.error('Error:', error)
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

// client.login(process.env.DISCORD_TOKEN)
