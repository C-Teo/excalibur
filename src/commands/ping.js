import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { readConfig } from "./../utils/config.js";
import getClient from "./../client.js";

export default {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pings the channel with a reminder."),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle("{reminder.title}")
			.setURL("https://discord.js.org/")
			.setDescription("{reminder.desc}")
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields({ name: "Mentions:", value: "{reminder.mentions}" })
			.setTimestamp()
			.setFooter({
				text: "This reminder is for a {reminder.status} event.",
				iconURL: "https://i.imgur.com/AfFp7pu.png",
			});

		const guildId = interaction.guild.id;
		const config = await readConfig();

		if (config[guildId]) {
			embed.addFields({
				name: "Configured Channel",
				value: `<#${config[guildId].channel}>`,
			});
		} else {
			await interaction.reply({
				content: "No channel has been configured.",
				ephemeral: true,
			});
			return;
		}

		const guild = getClient().guilds.cache.get(guildId);
		const channel = guild.channels.cache.get(config[guildId].channel);

		await channel.send({
			embeds: [embed],
			allowedMentions: { users: [interaction.user.id] },
		});

		await interaction.reply({
			content: "Ping sent successfully.",
			ephemeral: true,
		});
	},
};
