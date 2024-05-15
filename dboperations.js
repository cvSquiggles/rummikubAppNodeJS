var config = require('./dbconfig');
const sql = require('mssql');

async function getPlayers() {
    console.log('starting run');
    try {
        let pool = await sql.connect(config);
        console.log('We got the connect established.');
        let players = pool.request().query("SELECT * FROM Player");
        console.log('We have entered the query.');
        return (await players).recordsets;
    } catch(error){
        console.log(error);
    }
}

module.exports ={
    getPlayers: getPlayers
}