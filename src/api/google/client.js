import { google } from 'googleapis'

export async function sheets(auth) {
    const sheets = google.sheets({
        version: 'v4',
        auth: auth,
    })

    return sheets;
}

export async function spreadsheet(sheets, id, range) {
    const spreadsheet = await sheets.spreadsheets.values.get({
        "spreadsheetId": id,
        "range": range,
    });

    return spreadsheet;
}