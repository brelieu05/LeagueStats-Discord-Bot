const axios = require('axios');
const { riotToken } = require('./config.json');
const { data } = require('./champion.json');
const { SlashCommandBuilder } = require('discord.js');

async function getPUUID(username){
	try{
		const response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${riotToken}`);
		const summonerPuuid = response.data.puuid;
		return summonerPuuid;
	}
	catch(err){
		if(err.response)
		    console.log(`Error: ${err.response.status}`);
        else
            console.log(err);
	}
}

async function getSummonerId(username){
	try{
		const puuid = await getPUUID(username);
		const response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotToken}`);
		return response.data.id;
	}
	catch(err){
        if(err.response)
		    console.log(`Error: ${err.response.status}`);
        else
            console.log(err);
	}
}

async function getLeagueRank(username){
	try{
		const summonerId = await getSummonerId(username);
		const response = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${riotToken}`);
		return `${response.data[0].tier} ${response.data[0].rank}`;
	}
	catch(err){
		if(err.response)
		    console.log(`Error: ${err.response.status}`);
        else
            console.log(err);
	}
}

async function getLeagueWinLoss(username){
	try{
		const summonerId = await getSummonerId(username);
		const response = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${riotToken}`);
		return `${response.data[0].wins}-${response.data[0].losses}`;
	}
	catch(err){
		if(err.response)
		    console.log(`Error: ${err.response.status}`);
        else
            console.log(err);
	}
}

async function getTopMasteryChamp(username){
	try{
		const puuid = await getPUUID(username);
		const response = await axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${riotToken}`);
        var champion = "";
        var championPoints = 0;
        for(let champ in data){
            if(data[champ].key == response.data[0].championId){
                champion = data[champ].id;
                championPoints = response.data[0].championPoints;
            }
        }

		return `${champion} (${championPoints} pts)`;
	}
	catch(err){
		if(err.response)
		    console.log(`Error: ${err.response.status}`);
        else
            console.log(err);
	}
}

async function getNoLifeScore(username){
	try{
        const puuid = await getPUUID(username);
		const response = await axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/${puuid}?api_key=${riotToken}`);
        console.log(response.data);
		return response.data;
	}
	catch(err){
		if(err.response)
		    console.log(`Error: ${err.response.status}`);
        else
            console.log(err);
	}
}


module.exports = {
    getLeagueRank,
    getLeagueWinLoss,
    getTopMasteryChamp,
    getNoLifeScore
};