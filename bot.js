var Twit = require("twit"),
    config = require("./config"),
    apiConfig = config.api,
    botConfig = config.bot;

var T = new Twit(apiConfig);

var stream = T.stream("statuses/filter", {track: botConfig.handle});

stream.on("tweet", function(tweet) {
    console.log(tweet)
});
