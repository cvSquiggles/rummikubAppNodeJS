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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use('/api', router);  // Set base api route

//Middleware always called before any other route
//Authenitcation and input analysis can be handled here before submitting API request
router.use((request, response, next) => {
    console.log('middleware');
    next();
})

//Player Routes

//Pull all players from database
router.route('/players').get((request, response) => {
    Db.getPlayers().then(result => {
        console.log(result);
        response.json(result[0]);
    })
})

//Pull a specific player from database
router.route('/player').post((req, res) => {
    const {tag} = req.body;
    console.log(tag)
    Db.getPlayer(tag).then(result => {
        if(result !== false){
            res.json(result[0]);
        } else {
            res.json({ id: 0, tag: "FAILED"});
        }
        
    })
})


app.get('/test', (req, res) => {
    res.send('hello')
})

//Add a new player to the database
router.route('/addPlayer').post(async (req, res) => {
    const {tag} = req.body;
    console.log(tag)
    await Db.addPlayer(tag).then(result => {
        // console.log(result);
        res.json(result).status(201);
    })
})

//Match Routes

//Pull a specific match from database
router.route('/match').post((req, res) => {
    const {gameCode} = req.body;
    console.log(gameCode)
    Db.getMatch(gameCode).then(result => {
        if(result !== false){
            res.json(result[0]);
        } else {
            res.json({ gameCode: "FAILED"});
        }
    })
})

//Add a new match to the database
router.route('/addMatch').post((req, res) => {
    const {p1, p2} = req.body;
    console.log(p1 + " " + p2)
    Db.addMatch(p1, p2
    ).then(result => {
        //console.log(result);
        res.json(result).status(201);
    })
})

//Update match times on play or pause button hit
router.route('/matchTime').put((req, res) => {
    const {p1Minutes, p1Seconds, p1Milli, p2Minutes, p2Seconds, p2Milli, gameCode} = req.body;
    console.log(p1Minutes, p1Seconds, p1Milli, p2Minutes, p2Seconds, p2Milli, gameCode);
    Db.matchTime(p1Minutes, p1Seconds, p1Milli, p2Minutes, p2Seconds, p2Milli, gameCode
    ).then(result => {
        //console.log(result);
        res.json(result).status(201);
    })
})

//Update match scores on submit round scores hit
router.route('/matchScore').put((req, res) => {
    const {p1MatchScore, p2MatchScore, roundCount, gameCode}  = req.body;
    Db.matchScore(p1MatchScore, p2MatchScore, roundCount, gameCode
    ).then(result => {
        //console.log(result);
        res.json(result).status(201);
    })
})

//Update match winner on Report match hit
router.route('/matchWinner').put((req, res) => {
    const {winner, gameCode} = req.body;
    Db.matchWinner(winner, gameCode
    ).then(result => {
        //console.log(result);
        res.json(result).status(201);
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