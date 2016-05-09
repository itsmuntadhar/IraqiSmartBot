module.exports = function () {

    this.UserWelcomePhrases = ["مرحبًا", "مرحبا", "هلو", "السلام عليكم", "سلام", "صباح الخير", "مساء الخير"];
    this.BotWelcomePhrases = ["مراحب", "هلوات", "وعليكم السلام"];
    this.UserThankPhrases = ["شكرا", "شكرًا", "شكراً", "ممنون", "مشكور", "تسلم", "الله يخليك"];
    this.BotThankPhrases = ["تدللـ(ـين)", "بالخدمة"];
    this.UserWeatherRequestPhrases = ["شلونه الجو ب", "شلونه الجو", "حارة باردة", "اكو مطر"];
    this.UserHowAreYouPhrases = ["شلونك", "شخبارك", "شكو ماكو"];
    this.BotHowAreYouPhrases = ["الحمد لله", "ماشية إن شاء الله", "بخير مادام انت بخير", "ماكو شي", "صافية دافية"];
    this.UserSportPhrases = ["شوكت لعبة"];
    this.UserLunchRequestPhrases = ["شنسوي للغده", "اقترحلي غده", "شنسوي للغدة", "اقترحلي غدة", "شتقترح غدة", "شتقترح غده"];
    this.BotLunchResponsePhrases = ["دولمة", "تمن ومرگ", "باجة", "تمن باگلة", "سمك، بأي شكل"];
    this.UserDinnerRequestPhrases = ["شنسوي للعشه", "اقترحلي عشه", "شنسوي للعشة", "اقترحلي عشة", "شتقترح عشة", "شتقترح عشه"];
    this.BotDinnerResponsePhrases = ["بيتزا", "معكرونة", "دجاج شوي", "كباب", "جبن وشاي", "حافظ على رشاقتك"];
    this.UserWhereAreYouPhrases = ["وينك", "وين عايش"];
    this.BotWhereAreYouPhrases = ["بالنت", "فيسبوك مسنجر والتيليكرام"];
    this.UserWhoAreYouPhrases = ["منو انت", "انت منو", "منو انته", "منو مسويك", "منو مبرمجك", "منو مخترعك"];
    this.BotWhoAreYouPhrases = ["اني لحد الآن بدون اسم رسمي، صدگني. بس حاليًا إسمي:\n\rIraqi Smart Bot - بوت عراقي ذكي", "مبرمج عراقي"];

    this.PhraseParser = function (phrase) {
        var res = { phraseType: "", phraseContent: "" };
        phrase = phrase.indexOf(-1) == '?' || phrase.indexOf(-1) == "؟" ? phrase.substr(0, phrase.length - 1) : phrase;
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
        } else if (doesPhraseContainThank(phrase)) {
            res.phraseType = "UserThankPhrase";
            res.phraseContent = BotThankPhrases[randomIntFromInterval(0, BotThankPhrases.length - 1)];
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
        } else if (phrase.indexOf(UserSportPhrases[0]) > -1) {
            var teamId;
            phrase = phrase.indexOf(-1) == '?' || phrase.indexOf(-1) == "؟" ? phrase.substr(0, phrase.length - 1) : phrase;
            switch (phrase.substr(10)) {
                case "برشلونة":
                    teamId = 15702;
                    break;
                case "برشلونه":
                    teamId = 15702;
                    break;
                case "ريال مدريد":
                    teamId = 16110;
                    break;
                default:
                    teamId = -1;
                    break;
            }
            res.phraseType = "UserSportPhrase";
            res.phraseContent = teamId;
        } else if (doesPhraseContainLunch(phrase)) {
            res.phraseType = "UserLunchRequest";
            res.phraseContent = BotLunchResponsePhrases[randomIntFromInterval(0, BotLunchResponsePhrases.length - 1)];
        } else if (doesPhraseContainDinner(phrase)) {
            res.phraseType = "UserDinnerRequest";
            res.phraseContent = BotDinnerResponsePhrases[randomIntFromInterval(0, BotDinnerResponsePhrases.length - 1)];
        } else if (phrase.indexOf(UserWhereAreYouPhrases[0]) > -1 || phrase.indexOf(UserWhereAreYouPhrases[1]) > -1 || phrase.indexOf(UserWhereAreYouPhrases[2]) > -1) {
            res.phraseType = "UserWhereAreYouPhrase";
            res.phraseContent = BotWhereAreYouPhrases[randomIntFromInterval(0, 1)];
        } else if (phrase.indexOf(UserWhoAreYouPhrases[0]) > -1 || phrase.indexOf(UserWhoAreYouPhrases[1]) > -1 || phrase.indexOf(UserWhoAreYouPhrases[2]) > -1) {
            res.phraseType = "UserWhoAreYouPhrase";
            res.phraseContent = BotWhoAreYouPhrases[0];
        } else if (phrase.indexOf(UserWhoAreYouPhrases[3]) > -1 || phrase.indexOf(UserWhoAreYouPhrases[4]) > -1 || phrase.indexOf(UserWhoAreYouPhrases[5]) > -1) {
            res.phraseType = "UserWhoAreYouPhrase";
            res.phraseContent = BotWhoAreYouPhrases[1];
        } else {
            res.phraseType = "UnknownPhrase-";
            res.phraseContent = "ممم ما فهمت عليك، مرة ثانية بلا زحمة." + "\n\r" + "الي اكدر اجاوبك عليه حاليًا" + "\n\r";
            res.phraseContent += "شلونه الجو" + "\n\r";
            res.phraseContent += "منو مبرمجك" + "\n\r";
            res.phraseContent += "منو انت" + "\n\r";
            res.phraseContent += "شتقترح غدة" + "\n\r";
            res.phraseContent += "شتقترح عشة" + "\n\r";
        }
        return res
    };

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    function doesPhraseContainLunch(phrase) {
        for (var i = 0; i < UserLunchRequestPhrases.length; i++) {
            if (phrase.indexOf(UserLunchRequestPhrases[i]) > -1) return true;
            else continue;
        }
        return false;
    };

    function doesPhraseContainDinner(phrase) {
        for (var i = 0; i < UserDinnerRequestPhrases.length; i++) {
            if (phrase.indexOf(UserDinnerRequestPhrases[i]) > -1) return true;
            else continue;
        }
        return false;
    };

    function doesPhraseContainThank(phrase) {
        for (var i = 0; i < UserThankPhrases.length; i++) {
            if (phrase.indexOf(UserThankPhrases[i]) > -1) return true;
            else continue;
        }
        return false;
    };
};