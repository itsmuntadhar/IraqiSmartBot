var restify = require('restify');
var builder = require('botbuilder');
require('./phrases.js')();
require('./weather.js')();

var requestingCity = false;

var bot = new builder.BotConnectorBot({ appId: 'IraqiSmartBot', appSecret: '9fffc9610c6a4fc3b0e719bbf5607fe7' });

bot.add('/', function (session) {
    var parsedPhrase = PhraseParser(session.message.text);
    if (parsedPhrase.phraseType == "UserWelcomePhrase") {
        session.send(parsedPhrase.phraseContent);
    } else if (parsedPhrase.phraseType == "UserWeatherRequestPhrase0") {
        GetWeather(session, parsedPhrase.phraseContent);
    } else if (parsedPhrase.phraseType == "UserWeatherRequestPhrase1") {
        requestingCity = true;
        session.send("وين؟ - اسم المدينة بدون إضافات");
    } else {
        if (!requestingCity) session.send(parsedPhrase.phraseContent);
        else {
            requestingCity = false;
            GetWeather(session, session.message.text);
        }
    }
});

//Server configurations
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 8080, function () { console.log("Server started at %s", server.url); });

