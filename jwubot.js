var _           = require('underscore');
var Client      = require('node-rest-client').Client;
var Twit        = require('twit');
var async       = require('async');
var wordFilter  = require('wordfilter');
var moment      = require('moment');
var controller  = require('./controller.js');

var master = process.env.JWUBOT_MASTER_SN;

var t = new Twit({
    consumer_key:         process.env.JWUBOT_TWIT_CONSUMER_KEY
  , consumer_secret:      process.env.JWUBOT_TWIT_CONSUMER_SECRET
  , access_token:         process.env.JWUBOT_TWIT_ACCESS_TOKEN
  , access_token_secret:  process.env.JWUBOT_TWIT_ACCESS_TOKEN_SECRET
});

getMasterFollowers = function() {
    console.log("Running getMasterFollowers at " + moment().format("YYYY-MM-DD H:mm:ss"));
    console.log("Master: " + master);
    console.log("CK: " + process.env.JWUBOT_TWIT_CONSUMER_KEY);
    console.log("AT: " + process.env.JWUBOT_TWIT_ACCESS_TOKEN);
    var ret = undefined;

    t.get('followers/ids', { screen_name: master },  function (err, data, response) {
      if (data.ids) {
        _.each(data.ids, function (theid) {
          // loop thru each id
          t.get('statuses/user_timeline', { user_id: theid, count: 2 }, function(err, data, response) {
            _.each(data, function(tweet) {
              var minutes_passed = moment().diff(tweet.created_at, 'minutes');
              var tid = tweet.id_str,
                  ttext = tweet.text;

              // if the tweet has been tweeted less than 30minutes ago, process it
              if (minutes_passed < 30) {
                // judge if we send a reply to the tweet
                // var greeting = getGreetingTime(moment(tweet.created_at));
                var we_rt = controller.processTweet(tid, ttext);

                if (we_rt) {
                  // go retweet!
                  t.post('statuses/retweet/:id', { id: tid }, function (err, data, response) {
                    console.log("Successfully retweeted " + tid);
                  })
                }

              }
            })
          })
        })
      }
    });
};

function getGreetingTime (m) {
  var g = null; //return g
  
  if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
  
  var split_afternoon = 12 //24hr time to split the afternoon
  var split_evening = 17 //24hr time to split the evening
  var currentHour = parseFloat(m.format("HH"));
  
  if(currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "afternoon";
  } else if(currentHour >= split_evening) {
    g = "evening";
  } else {
    g = "morning";
  }
  
  return g;
}

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
// setInterval(function() {
//   try {
//     run();
//   } catch(e) {
//     console.log(e)
//   }
// }, 60000 * 10);