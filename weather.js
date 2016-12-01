module.exports = function () {

    this.GetWeather = function (session, city) {
        if (city == "") city = "السماوة";
        if (city.slice(-1) == "?" || city.slice(-1) == "؟") city = city.substr(0, city.length - 1);
        //if (city.slice(-1) == "ة") city = city.replace("ة", "ا");
        if (city == "السماوة") city = "السماوا";
        var YQL = require('yql');
        var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")');
        //if (city.slice(-1) == "ا") city = city.substr(0, city.length - 1) + "ة";
        if (city == "السماوا") city = "السماوة";
        query.exec(function (err, data) {
            if (err == null) {
                var location = data.query.results.channel.location;
                var condition = data.query.results.channel.item.condition;
                session.endDialog('الجو بـ ' + city + ': ' + translateWeatherCondition(condition.text) + ' ودرجة حرارة حوالي ' + Math.round(((condition.temp - 32) / 1.8)).toFixed(2) + ' درجة.');
            } else {
                session.endDialog(err);
            }
        });
    }
    
    this.translateWeatherCondition = function (condition) {
        var res = "";
        switch (condition.toLowerCase()) {
            case "clear":
                res = "صحو";
                break;
            case "sunny":
                res = "مُشمس";
                break;
            case "mostly clear":
                res = "صحو غالبًا";
                break;
            case "partly clear":
                res = "صحو جزئيًا";
                break;
            case "cloudy":
                res = "غائم";
                break;
            case "partly cloudy":
                res = "غائم جزئيًا";
                break;
            case "mostly cloudy":
                res = "غائم غالبًا";
                break;
            case "rain":
                res = "ممطر";
                break;
            case "thunderstorms":
                res = "عواصف رعدية";
                break;
            default:
                console.log(condition);
                res = "غير معروف";
                break;
        }
        return res;
    }
}