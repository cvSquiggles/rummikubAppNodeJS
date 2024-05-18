var config = require('./dbconfig');
const sql = require('mssql');

async () => {
    try {
        await sql.connect(config)
        const result = await sql.query('select * from player')
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

async function getPlayers() {
    try {
        let pool = await sql.connect(config);
        let players = await pool
            .request()
            .query("SELECT * FROM Player");
        pool.close();
        return players.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//Player API functions

//Search a player record based on tag
async function getPlayer(tag) {
    try {
        let pool = await sql.connect(config);
        console.log('pool', pool);
        let player = await pool.request()
            .input('tag', sql.VarChar, tag)
            .query("SELECT * FROM Player WHERE tag=@tag");
        pool.close();
        //console.log(`Here's the check: ${player.recordset.length}`)
        if (player.recordset.length > 0) {
            return player.recordset;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
    }
}

//Search a player record based on id
async function getPlayer_id(id) {
    try {
        let pool = await sql.connect(config);
        console.log('pool', pool);
        let player = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM Player WHERE id=@id");
        pool.close();
        //console.log(`Here's the check: ${player.recordset.length}`)
        if (player.recordset.length > 0) {
            return player.recordset;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
    }
}

//Search a player record based on tag
async function addPlayer(tag) {
    try {
        let pool = await sql.connect(config);
        console.log('pool',pool)
        if(pool){
            let addPlayer = await pool.request()
                .input('player_tag', sql.VarChar, tag)
                .query('INSERT INTO Player VALUES (@player_tag)');
            pool.close();
        }
        // return addPlayer.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//Match API Functions

//Search a match record base on gameCode
async function getMatch(gameCode) {
    try {
        let pool = await sql.connect(config);
        // if(pool){
            let match = await pool.request()
            .input('match_gameCode', sql.Int, gameCode)
            .query("SELECT * FROM Match WHERE gameCode=@match_gameCode");
        pool.close();
        // }
        if (match.recordset.length > 0){
            return match.recordset;
        } else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

//Get the latest match created in the database
//Search a match record base on gameCode
async function getMatch_latest() {
    try {
        let pool = await sql.connect(config);
        // if(pool){
            let match = await pool.request()
            .query("SELECT MAX(gameCode) as gameCode FROM match");
        pool.close();
        // }
        if (match.recordset.length > 0){
            return match.recordset;
        } else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

//Add a match record base on gameCode
async function addMatch(p1, p2) {
    try {
        let pool = await sql.connect(config);
        console.log('pool',pool)
        let addMatch = await pool.request()
            .input('p1', sql.Int, p1)
            .input('p2', sql.Int, p2)
            .query("INSERT INTO Match VALUES (30, 0, 0, 0, 30, 0, 0, 0, 1, @p1, @p2, NULL)");
        pool.close();
        return addMatch.recordset;
    } catch (error) {
        console.log(error);
    }
}

//Update match time on play or pause button hit
async function matchTime(p1Minutes, p1Seconds, p1Milli,
    p2Minutes, p2Seconds, p2Milli, gameCode) {
    try {
        let pool = await sql.connect(config);
        console.log('pool',pool);
        let updateMatch_time = await pool.request()
            .input('p1Minutes', sql.Int, p1Minutes)
            .input('p1Seconds', sql.Int, p1Seconds)
            .input('p1Milli', sql.Int, p1Milli)
            .input('p2Minutes', sql.Int, p2Minutes)
            .input('p2Seconds', sql.Int, p2Seconds)
            .input('p2Milli', sql.Int, p2Milli)
            .input('gameCode', sql.Int, gameCode)
            .query("UPDATE Match SET p1Minutes = @p1Minutes, p1Seconds = @p1Seconds, p1Milli = @P1Milli, p2Minutes = @p2Minutes, p2Seconds = @p2Seconds, p2Milli = @p2Milli WHERE gameCode = @gameCode");
        pool.close();
        //return updateMatch_time.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//Update match scores on submit round scores hit
async function matchScore(p1MatchScore, p2MatchScore, roundCount, gameCode) {
    try {
        let pool = await sql.connect(config);
        let updateMatch_score = await pool.request()
            .input('p1MatchScore', sql.Int, p1MatchScore)
            .input('p2MatchScore', sql.Int, p2MatchScore)
            .input('roundCount', sql.Int, roundCount)
            .input('gameCode', sql.Int, gameCode)
            .query("UPDATE Match SET p1MatchScore = @p1MatchScore, p2MatchScore = @p2MatchScore, roundCount = @roundCount WHERE gameCode = @gameCode");
        pool.close();
        //return updateMatch_score.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//Update match winner on Report match hit
async function matchWinner(winner, gameCode) {
    try {
        let pool = await sql.connect(config);
        let updateMatch_winner = await pool.request()
            .input('winner', sql.Int, winner)
            .input('gameCode', sql.Int, gameCode)
            .query("UPDATE Match SET winner = @winner WHERE gameCode = @gameCode");
        pool.close();
        //return updateMatch_winner.recordsets;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getPlayers: getPlayers,
    getPlayer: getPlayer,
    getPlayer_id: getPlayer_id,
    addPlayer: addPlayer,
    getMatch: getMatch,
    getMatch_latest: getMatch_latest,
    addMatch: addMatch,
    matchTime: matchTime,
    matchScore: matchScore,
    matchWinner: matchWinner
}