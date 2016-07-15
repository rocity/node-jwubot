var _           = require('underscore');
var Client      = require('node-rest-client').Client;
var Twit        = require('twit');
var async       = require('async');
var wordFilter  = require('wordfilter');
var moment      = require('moment');
var controller  = require('./controller.js');

// var master = process.env.JWUBOT_MASTER_SN;
var master = 'iamkvnpl';

var t = new Twit({
    consumer_key:         'mGBfltC2nuUtOI5udrucfhcpH'
  , consumer_secret:      'WRuQFpmLUiiCJqhdgDn3cSO209rCqQWW5AsVIc54yx2MwYWU52'
  , access_token:         '4432955655-Z009iaxOQuZ8wuYbC5Y1MXzQsHF0r5YxyKWAxrC'
  , access_token_secret:  '3aFTtkjof6xFr8BiLS56reR7KHkT1gP9oRarM9kAZ2kwL'
});

getMasterFollowers = function() {
    var ret = undefined;
          t.get('statuses/user_timeline', { screen_name: 'iamkvnpl', count: 2 }, function(err, data, response) {
            _.each(data, function(tweet) {
              var minutes_passed = moment().diff(tweet.created_at, 'minutes');
              var tid = tweet.id_str,
                  ttext = tweet.text;

              // if the tweet has been tweeted less than 30minutes ago, process it
              if (minutes_passed < 30) {
                // judge if we send a reply to the tweet
                var we_reply = controller.processTweet(tid, ttext);
                
              }
            })
          })
    // t.get('followers/ids', { screen_name: master },  function (err, data, response) {
    //   if (data.ids) {
    //     _.each(data.ids, function (theid) {

    //     })
    //   }
    // });
};

// postTweet = function(botData, cb) {
//     var list = []
//     var rn = _.random(0, (list.length - 1));
//     t.post('statuses/update', {status: list[rn].concat(' #CarteBlanche2015 #CarteBlancheDavao #CBMMF')}, function(err, data, response) {
//       console.log('Tweet posted.');
//     });
// };

run = function() {
  async.waterfall([
    getMasterFollowers
  ],
  function(err, data) {
    console.log(err),
    console.log(data)
  });
};

run();

// tweetQuote = function() {
//   async.waterfall([
//     postTweet
//   ],
//   function(err, botData) {

//   });
// };

// setInterval(function() {
//   try {
//     run();
//   }
//   catch (e) {
//     console.log(e);
//   }
// }, 60000 * 3); // run every 3 minutes

// setInterval(function() {
//   try {
//     tweetQuote();
//   }
//   catch (e) {
//     console.log(e);
//   }
// }, 60000 * 30); // run every 30 minutes
