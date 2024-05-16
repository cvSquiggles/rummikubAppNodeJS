var Db = require('./dboperations.js');
var Player = require('./player');
//Temporary for first query
//var config = require('./dbconfig');
//const sql = require ('mssql');
//sql.connect(config);
//

// Express to create API, body-parser to parse request/response,
// enable cross-origin resource sharing, and create express object app, and a router object
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();
const port = process.env.PORT || 8090;
var router = express.Router();

//Base page
app.get('/', (req, res) => {
    res.send('RummikubApp-Node Root');
})

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);  // Set base api route

//Middleware always called before any other route
//Authenitcation and input analysis can be handled here before submitting API request
router.use((request, response, next) => {
    console.log('middleware');
    next();
})

//Player Routes

//Pull all players from database
router.route('/players').get((request, response)=>{
    Db.getPlayers().then(result => {
        console.log(result);
        response.json(result[0]);
    })
})

//Pull a specific player from database
router.route('/player/:tag').get((request, response)=>{
    Db.getPlayer_tag(request.params.tag).then(result => {
        //console.log(result);
        response.json(result[0]);
    })
})

//Add a new player to the database
router.route('/addPlayer/:tag').post((request, response)=>{
    Db.addPlayer(request.params.tag).then(result => {
        //console.log(result);
        response.json(result).status(201);
    })
})

//Match Routes

//Pull a specific match from database
router.route('/match/:gameCode').get((request, response)=>{
    Db.getMatch_gameCode(request.params.gameCode).then(result => {
        //console.log(result);
        response.json(result);
    })
})

//Add a new match to the database
router.route('/addMatch/:p1Minutes/:p1Seconds/:p1Milli/:p1MatchScore/:p2Minutes/:p2Seconds/:p2Milli/:p2MatchScore/:roundCount/:p1/:p2').post((request, response)=>{
    Db.addMatch(request.params.p1Minutes, request.params.p1Seconds, request.params.p1Milli,
        request.params.p1MatchScore, request.params.p2Minutes, request.params.p2Seconds,
        request.params.p2Milli, request.params.p2MatchScore, request.params.roundCount, request.params.p1, request.params.p2
    ).then(result => {
        //console.log(result);
        response.json(result).status(201);
    })
})

//Update an existing match in the database
//router.route('/addMatch/:p1Minutes/:p1Seconds/:p1Milli/:p1MatchScore/:p2Minutes/:p2Seconds/:p2Milli/:p2MatchScore/:roundCount/:p1/:p2').post((request, response)=>{
//    Db.addMatch(request.params.p1Minutes, request.params.p1Seconds, request.params.p1Milli,
//        request.params.p1MatchScore, request.params.p2Minutes, request.params.p2Seconds,
//        request.params.p2Milli, request.params.p2MatchScore, request.params.roundCount, request.params.p1, request.params.p2
//    ).then(result => {
//        //console.log(result);
//        response.json(result).status(201);
//    })
//})

//Update match times on play or pause button hit
router.route('/updateMatch_time/:p1Minutes/:p1Seconds/:p1Milli/:p2Minutes/:p2Seconds/:p2Milli/:gameCode').put((request, response)=>{
    Db.updateMatch_time(request.params.p1Minutes, request.params.p1Seconds, request.params.p1Milli,
        request.params.p2Minutes, request.params.p2Seconds, request.params.p2Milli, request.params.gameCode
    ).then(result => {
        //console.log(result);
        response.json(result).status(201);
    })
})

//Update match scores on submit round scores hit
router.route('/updateMatch_score/:p1MatchScore/:p2MatchScore/:roundCount/:gameCode').put((request, response)=>{
    Db.updateMatch_score(request.params.p1MatchScore, request.params.p2MatchScore, request.params.roundCount, request.params.gameCode
    ).then(result => {
        //console.log(result);
        response.json(result).status(201);
    })
})

//Update match winner on Report match hit
router.route('/updateMatch_winner/:winner/:gameCode').put((request, response)=>{
    Db.updateMatch_winner(request.params.winner, request.params.gameCode
    ).then(result => {
        //console.log(result);
        response.json(result).status(201);
    })
})


//localhost:8090/api/updateMatch_time/:14/:10/:9/:22/:21/:20/:1005

// Declare port to listen on for local testing
//var port = process.env.PORT || 8090;
//app.listen(port);
//console.log('Order API is running at ' + port);

// Declare port to listen on for Azure
app.listen(port, () => {
    console.log('Order API is running at ' + port);
});

//Db.getPlayers().then(result => {
//    console.log(result);
//})