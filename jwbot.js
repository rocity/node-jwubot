var _           = require('lodash');
var Client      = require('node-rest-client').Client;
var Twit        = require('twit');
var async       = require('async');
var wordFilter  = require('wordfilter');

var t = new Twit({
    consumer_key:         process.env.CBBOT_TWIT_CONSUMER_KEY
  , consumer_secret:      process.env.CBBOT_TWIT_CONSUMER_SECRET
  , access_token:         process.env.CBBOT_TWIT_ACCESS_TOKEN
  , access_token_secret:  process.env.CBBOT_TWIT_ACCESS_TOKEN_SECRET
});

getPublicTweet = function(cb) {

    t.get('search/tweets', { q: '#CarteBlanche2015', count: 1 }, function(err, data, response) {
      cb(data);
    });

};

postTweet = function(botData, cb) {
    var list = []
    var rn = _.random(0, (list.length - 1));
    t.post('statuses/update', {status: list[rn].concat(' #CarteBlanche2015 #CarteBlancheDavao #CBMMF')}, function(err, data, response) {
      console.log('Tweet posted.');
    });
};

run = function() {
  async.waterfall([
    getPublicTweet
  ],
  function(err, botData) {
    if (err) {
        _.forEach(err.statuses, function(n, key) {
          var tid = n.id_str;
            if (n.retweeted === false) {
                t.post('statuses/retweet/:id', { id: tid }, function (err, data, response) {
                    console.log(data);
                });
            }
        });
    }
  });
};

tweetQuote = function() {
  async.waterfall([
    postTweet
  ],
  function(err, botData) {

  });
};

setInterval(function() {
  try {
    run();
  }
  catch (e) {
    console.log(e);
  }
}, 60000 * 3); // run every 3 minutes

setInterval(function() {
  try {
    tweetQuote();
  }
  catch (e) {
    console.log(e);
  }
}, 60000 * 30); // run every 30 minutes
