var Db = require('./dboperations.js');
var Player = require('./player');
//Temporary for first query
//var config = require('./dbconfig');
//const sql = require ('mssql');
//sql.connect(config);
//

console.log('Before the getPlayers call.');
Db.getPlayers().then(result => {
    console.log(result);
})
console.log('After getPlayers call.');