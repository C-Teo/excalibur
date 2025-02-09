import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
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

		await interaction.reply({
			embeds: [embed],
			allowedMentions: { users: [interaction.user.id] },
		});
	},
};
