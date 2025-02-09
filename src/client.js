import { Client, GatewayIntentBits } from "discord.js";

let client;
export default function getClient() {
	if (client) return client;
	client = new Client({
		intents: [GatewayIntentBits.Guilds],
	});
	return client;
}
