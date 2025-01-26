import { google } from 'googleapis'
import dotenv from 'dotenv'
import { Client, GatewayIntentBits } from 'discord.js'

dotenv.config()

async function main() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'secrets.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({
        version: 'v4',
        auth: auth,
    })

    // const authClient = await auth.getClient();
    const spreadsheet = await sheets.spreadsheets.values.get({
        "spreadsheetId": "1Cqq_EFGj8I3shKUckN50gdCgf84YeqWF3Esd8Uo4VV8",
        "range": "Sheet1!A1:D6",
    });

    for (let row of spreadsheet.data.values) {
        console.log(row)
    }
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

client.login(process.env.DISCORD_TOKEN)

main().catch(console.error);