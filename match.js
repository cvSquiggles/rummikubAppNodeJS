class Match{
    constructor(gameCode, p1Minutes, p1Seconds, p1Milli,
        p1MatchScore, p2Minutes, p2Seconds, p2Milli,
        p2MatchScore, roundCount, p1, p2, winner){
            this.gameCode = gameCode;
            this.p1Minutes = p1Minutes;
            this.p1Seconds = p1Seconds;
            this.p1Milli = p1Milli;
            this.p1MatchScore = p1MatchScore;
            this.p2Minutes = p2Minutes;
            this.p2Seconds = p2Seconds;
            this.p2Milli = p2Milli;
            this.p2MatchScore = p2MatchScore;
            this.roundCount = roundCount;
            this.p1 = p1;
            this.p2 = p2;
            this.winner = winner;
        }
}

module.exports = Match;