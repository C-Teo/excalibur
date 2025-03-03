import { SlashCommandBuilder, EmbedBuilder, Client } from "discord.js";
import { readConfig } from "./../utils/config.js";
import getClient from "./../client.js";
import { send_google_request } from "../api/google/client.js";
import {
	processArrayOfArrays,
	getReadyToBeRemindedTasks,
} from "../utils/processor.js";

export default {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pings the channel with a reminder."),
	async execute(interaction) {
		const guildId = interaction.guild.id;
		const config = await readConfig();

		if (!config[guildId]) {
			await interaction.reply({
				content: "No channel has been configured.",
				ephemeral: true,
			});
			return;
		}

		const client = getClient();
		const guild = client.guilds.cache.get(guildId);
		const channel = guild.channels.cache.get(config[guildId].channel);

		const output = await send_google_request();
		const processedArray = processArrayOfArrays(output);
		const readyToBeRemindedTasks = getReadyToBeRemindedTasks(processedArray);

		for (const reminder of readyToBeRemindedTasks) {
			await guild.members.fetch();
			const member = guild.members.cache.find(
				(member) => member.user.username === reminder.assignee
			);

			channel.send(`Hey ${member}, you have a reminder!`);

			const embed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setTitle(`${reminder.task}`)
				.setDescription(`${reminder.taskDescription}`)
				.setThumbnail("https://i.imgur.com/cQpFiCj.png")
				.addFields({
					name: "Configured Channel",
					value: `<#${config[guildId].channel}>`,
				})
				.setTimestamp()
				.setFooter({
					text: `This reminder is for a ${reminder.reminderType} event.`,
				});

			await channel.send({
				embeds: [embed],
				allowedMentions: { users: [interaction.user.id] },
			});
		}

		await interaction.reply({
			content: "Ping sent successfully.",
			ephemeral: true,
		});
	},
};
