const { google } = require('googleapis')

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

main().catch(console.error);