import dotenv from "dotenv";
import { Collection, Events } from "discord.js";
import { getCommandFiles } from "./utils/get-commands.js";
import getClient from "./client.js";
dotenv.config();

// I don't enjoy JavaScript... it has no main function
const client = getClient();
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();
for (const command of await getCommandFiles()) {
	client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
