import cron from "node-cron";
import ping from "../commands/ping.js";
import { readConfig } from "../utils/config.js";
import logger from "../utils/logger.js";

const BOT_USER_ID = process.env.BOT_ID;

function mock_interaction(guildId) {
	return {
		guild: { id: guildId },
		user: { id: BOT_USER_ID },
		reply: async (tuple) => {
			try {
				logger.info(tuple.content);
			} catch (e) {
				console.error(e);
			}
		},
	};
}

export default function cronjob_scheduler() {
	cron.schedule("*/30 * * * * *", async () => {
		const config = await readConfig();

		if (!config) {
			logger.info("No config found.");
			return;
		}

		for (const guildId in config) {
			logger.info(
				"Executing ping for guild:",
				guildId.replace(/.(?=.{6})/g, "*")
			);
			ping.execute(mock_interaction(guildId));
		}
	});
}
