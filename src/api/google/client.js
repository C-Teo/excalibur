import { google } from "googleapis";

async function sheets(auth) {
	const sheets = google.sheets({
		version: "v4",
		auth: auth,
	});

	return sheets;
}

async function spreadsheet(sheets, id, range) {
	const spreadsheet = await sheets.spreadsheets.values.get({
		spreadsheetId: id,
		range: range,
	});

	return spreadsheet;
}

export async function send_google_request() {
	// TODO: Implement the function to send a request to the Google Sheets API dynamically
	const auth = new google.auth.GoogleAuth({
		keyFile: "./config/secrets.json",
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
	});

	try {
		const table = (
			await spreadsheet(
				await sheets(auth),
				"18ET6gqR_FxgtV3mLdDpIClzbx4sT_LQh4yzjrjR7XLg",
				"Sheet1!B3:G1000"
			)
		).data.values;

		return table;
	} catch (error) {
		console.error("Error:", error);
	}
}
