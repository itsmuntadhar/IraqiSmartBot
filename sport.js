module.exports = function () {
    this.GetNextMatch = function (session, teamId) {
        var request = require('request');
        request('http://api.football-api.com/2.0/matches?comp_id=1399&team_id=' + teamId + '&match_date=010116&Authorization=565eaa22251f932b9f000001d50aaf0b55c7477c5ffcdbaf113ebbda', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                session.send(body[0].localteam_name + " vs " + body[0].visitorteam_name + "\n\r" + 
                    body[0].formatted_date.replace(".", " ").replace(".", " ") + "\n\r" + body[0].time + " GMT");
            }
        });
    };
}