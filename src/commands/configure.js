import { SlashCommandBuilder, ChannelType } from "discord.js";
import { readConfig, writeConfig } from "./../utils/config.js";

export default {
	data: new SlashCommandBuilder()
		.setName("configure")
		.setDescription("Configure the bot.")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("The channel for bot messages.")
				.addChannelTypes(ChannelType.GuildText)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("sheetid")
				.setDescription("The sheet id for the bot.")
				.setRequired(true)
		),
	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const sheetId = interaction.options.getString("sheetid");

		const config = await readConfig();
		const guildId = interaction.guild.id;

		config[guildId] = config[guildId] || {};
		config[guildId].channel = channel.id;
		config[guildId].sheetId = sheetId;

		await writeConfig(config);
		await interaction.reply(
			`Channel <#${channel.id}> has been configured successfully.`
		);
	},
};
