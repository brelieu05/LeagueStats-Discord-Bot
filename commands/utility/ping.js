const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pings Jungkookie!'),
	async execute(interaction) {
		await interaction.reply('Yes it is me, me is Jungkookie! I will be lovin you right! :stuck_out_tongue');
	},
};
