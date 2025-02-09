import { getCommandFiles } from "./get-commands.js";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = (await getCommandFiles()).map((command) =>
	command.data.toJSON()
);
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
})();
