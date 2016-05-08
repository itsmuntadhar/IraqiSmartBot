module.exports = function () {

    this.UserWelcomePhrases = ["مرحبًا", "مرحبا", "هلو", "السلام عليكم", "سلام", "صباح الخير", "مساء الخير"];
    this.BotWelcomePhrases = ["مراحب", "هلوات", "وعليكم السلام"];
    this.UserWeatherRequestPhrases = ["شلونه الجو ب", "شلونه الجو", "حارة باردة", "اكو مطر"];
    this.UserHowAreYouPhrases = ["شلونك", "شخبارك", "شكو ماكو"];
    this.BotHowAreYouPhrases = ["الحمد لله", "ماشية إن شاء الله", "بخير مادام انت بخير", "ماكو شي", "صافية دافية"];

    this.PhraseParser = function (phrase) {
        var res = { phraseType: "", phraseContent: "" };
        if (phrase.indexOf(UserWelcomePhrases[0]) > -1 || phrase.indexOf(UserWelcomePhrases[1]) > -1) {
            res.phraseType = "UserWelcomePhrase";
            res.phraseContent = BotWelcomePhrases[0];
        } else if (phrase.indexOf(UserWelcomePhrases[2]) > -1) {
            res.phraseType = "UserWelcomePhrase";
            res.phraseContent = BotWelcomePhrases[1];
        } else if (phrase.indexOf(UserWelcomePhrases[3]) > -1 || phrase.indexOf(UserWelcomePhrases[4]) > -1) {
            res.phraseType = "UserWelcomePhrase";
            res.phraseContent = BotWelcomePhrases[2];
        } else if (phrase.indexOf(UserWelcomePhrases[5]) > -1) {
            res.phraseType = "UserWelcomePhrase";
            res.phraseContent = UserWelcomePhrases[5];
        } else if (phrase.indexOf(UserWelcomePhrases[6]) > -1) {
            res.phraseType = "UserWelcomePhrase";
            res.phraseContent = UserWelcomePhrases[6];
        } else if (phrase.indexOf(UserWeatherRequestPhrases[0]) > -1) {
            res.phraseType = "UserWeatherRequestPhrase0";
            res.phraseContent = phrase.substr(12);
        } else if (phrase.indexOf(UserWeatherRequestPhrases[1]) > -1 || phrase.indexOf(UserWeatherRequestPhrases[2]) > -1 ||
            phrase.indexOf(UserWeatherRequestPhrases[3]) > -1) {
            res.phraseType = "UserWeatherRequestPhrase1";
            res.phraseContent = "";
        } else if (phrase.indexOf(UserHowAreYouPhrases[0]) > -1 || phrase.indexOf(UserHowAreYouPhrases[1]) > -1) {
            var randInt = randomIntFromInterval(0, 2);
            res.phraseType = "UserHowAreYouPhrase";
            res.phraseContent = BotHowAreYouPhrases[randInt];
        } else if (phrase.indexOf(UserHowAreYouPhrases[2]) > -1) {
            var randInt = randomIntFromInterval(2, 3);
            res.phraseType = "UserHowAreYouPhrase";
            res.phraseContent = BotHowAreYouPhrases[randInt];
        } else {
            res.phraseType = "UnknownPhrase-";
            res.phraseContent = "ممم ما فهمت عليك، مرة ثانية بلا زحمة.";
        }
        return res
    };

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
};