var restify = require('restify');
var builder = require('botbuilder');
//var connector = require('botconnector');

require('./phrases.js')();
require('./weather.js')();
require('./sport.js')();

var requestingCity = false;

var bot = new builder.BotConnectorBot({ appId: 'IraqiSmartBot', appSecret: '9fffc9610c6a4fc3b0e719bbf5607fe7' });

bot.add('/', function (session) {
    //console.log(session.message);
    var parsedPhrase = PhraseParser(session.message.text);
    if (parsedPhrase.phraseType == "UserWelcomePhrase" || parsedPhrase.phraseType == "UserThankPhrase" ||
            parsedPhrase.phraseType == "UserLunchRequest" || parsedPhrase.phraseType == "UserDinnerRequest" || 
            parsedPhrase.phraseType == "UserWhereAreYouPhrase" || parsedPhrase.phraseType == "UserWhoAreYou" ||
            parsedPhrase.phraseType == "UserHowAreYouPhrase") {
        session.send(parsedPhrase.phraseContent);
    } else if (parsedPhrase.phraseType == "UserWeatherRequestPhrase0") {
        GetWeather(session, parsedPhrase.phraseContent);
    } else if (parsedPhrase.phraseType == "UserWeatherRequestPhrase1") {
        requestingCity = true;
        session.send("وين؟ - اسم المدينة بدون إضافات");
    } /*selse if (parsedPhrase.phraseType == "UserSportPhrase") {
        if (parsedPhrase.phraseContent == -1) {
            session.send("حاليًا بس برشلونة و ريال مدريد، اسف.");
        } else {
            GetNextMatch(session, parsedPhrase.phraseContent);
        }
    }*/ else {
        if (!requestingCity) 
        {
            session.send("أگدر أجاوب على اشياء مِثل: هلو، شلونك، شتقترح غدة، شتقترح عشة، منو انت، منو مبرمجك");
        }
        else {
            requestingCity = false;
            GetWeather(session, session.message.text);
        }
    }
});

//Server configurations
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || process.env.PORT || 8080, function () { console.log("Server started at %s", server.url); });

