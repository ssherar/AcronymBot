var Twit = require("twit"),
    config = require("./config"),
    acronym = require("./acronym"),
    apiConfig = config.api,
    botConfig = config.bot;

// [todo] - Implement a better logging module
var l = function(level, message) {
    console.log("[%s - %s] - %s",
                    new Date(),
                    level,
                    message
    );
}

l("info", "started script");
var T = new Twit(apiConfig),
    acronymMatch = /what is (\w+)\?/g
l("info", "authenticated against twitter, ready to start listening");
var stream = T.stream("statuses/filter", {track: botConfig.handle});

stream.on("tweet", function(tweet) {
    l("info", "received tweet: "+tweet.text);
    var text = tweet.text,
        user = tweet.user.screen_name;
    var match = acronymMatch.exec(text);
    if(match != null) {
        acronym.findOne({ acronym: match[1]}, function(err, found) {
            // [todo] - string formatting properly
            l("debug", "Found from database: " + found.acronym)
            reply = "@"+user+" "+found.acronym+" = "+ found.meaning;
            T.post('statuses/update', { status: reply }, function(err, res) {
                l("info","Reply: "+reply);
                l("info","Error: "+err);
                l("info","Resp : "+res);
            }); 
        });
    }
});


