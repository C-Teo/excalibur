import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export async function getCommandFiles() {
	const commands = [];
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const commandsFolderPath = path.join(__dirname, "/../commands");
	const commandsFiles = fs
		.readdirSync(commandsFolderPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandsFiles) {
		const filePath = path.join(commandsFolderPath, file);
		const fileURL = pathToFileURL(filePath).href;
		const command = await import(fileURL);
		if ("data" in command.default && "execute" in command.default) {
			commands.push(command.default);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}

	return commands;
}
