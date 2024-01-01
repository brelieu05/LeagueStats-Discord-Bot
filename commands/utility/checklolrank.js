const { SlashCommandBuilder } = require('discord.js');
const { getLeagueRank, getLeagueWinLoss, getTopMasteryChamp, getNoLifeScore } = require('../../riotapis.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('checklolstats')
		.setDescription('checks LOL Rank')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('LEAGUEUSERNAME')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('username');
		const rank = await getLeagueRank(input);
		const wl = await getLeagueWinLoss(input);
		const topMasteryChamp = await getTopMasteryChamp(input);
		const noLifeScore = await getNoLifeScore(input);
		
		await interaction.reply(
			`***${input}*** 
Win-Loss: **${wl}**
Rank: **${rank}**
Highest Mastery Point Champion: **${topMasteryChamp}**
No-Life-Score: **${noLifeScore}**`
		);
	},
};
