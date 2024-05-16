var config = require('./dbconfig');
const sql = require('mssql');

async function getPlayers() {
    try {
        let pool = await sql.connect(config);
        let players = await pool
        .request()
        .query("SELECT * FROM Player");
        pool.close();
        return players.recordsets;
    } catch(error){
        console.log(error);
    }
}

//Player API functions

//Search a player record based on tag
async function getPlayer_tag(tag) {
    try {
        let pool = await sql.connect(config);
        let player = await pool.request()
        .input('player_tag', sql.VarChar, tag)
        .query("SELECT * FROM Player WHERE tag=@player_tag");
        pool.close();
        return player.recordsets;
    } catch(error){
        console.log(error);
    }
}

//Search a player record based on tag
async function addPlayer(tag) {
    try {
        let pool = await sql.connect(config);
        let addPlayer = pool.request()
        .input('player_tag', sql.VarChar, tag)
        .query('INSERT INTO Player VALUES (@player_tag)');
        pool.close();
        return addPlayer.recordsets;
    } catch(error){
        console.log(error);
    }
}

//Match API Functions

//Search a match record base on gameCode
async function getMatch_gameCode(gameCode) {
    try {
        let pool = await sql.connect(config);
        let match = await pool.request()
        .input('match_gameCode', sql.Int, gameCode)
        .query("SELECT * FROM Match WHERE gameCode=@match_gameCode");
        pool.close();
        return match.recordsets;
    } catch(error){
        console.log(error);
    }
}

//Search a match record base on gameCode
async function addMatch(p1Minutes, p1Seconds, p1Milli, p1MatchScore,
    p2Minutes, p2Seconds, p2Milli, p2MatchScore, roundCount, p1, p2) {
    try {
        let pool = await sql.connect(config);
        let addMatch = await pool.request()
        .input('p1Minutes', sql.Int, p1Minutes)
        .input('p1Seconds', sql.Int, p1Seconds)
        .input('p1Milli', sql.Int, p1Milli)
        .input('p1MatchScore', sql.Int, p1MatchScore)
        .input('p2Minutes', sql.Int, p2Minutes)
        .input('p2Seconds', sql.Int, p2Seconds)
        .input('p2Milli', sql.Int, p2Milli)
        .input('p2MatchScore', sql.Int, p2MatchScore)
        .input('roundCount', sql.Int, roundCount)
        .input('p1', sql.Int, p1)
        .input('p2', sql.Int, p2)
        .query("INSERT INTO Match VALUES (@p1Minutes, @p1Seconds, @p1Milli, @p1MatchScore, @p2Minutes, @p2Seconds, @p2Milli, @p2MatchScore, @roundCount, @p1, @p2, NULL)");
        pool.close();
        return addMatch.recordsets;
    } catch(error){
        console.log(error);
    }
}


module.exports ={
    getPlayers: getPlayers,
    getPlayer_tag: getPlayer_tag,
    addPlayer: addPlayer,
    getMatch_gameCode: getMatch_gameCode,
    addMatch: addMatch
}