import { getCommandFiles } from "./get-commands.js";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config(); // This file runs seperate from index.js

const commands = (await getCommandFiles()).map((command) =>
	command.data.toJSON()
);
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		logger.info(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands }
		);

		logger.info(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
})();
