var jsonfile = require('jsonfile');
var _ = require('underscore');
var moment = require('moment');

var datafile = './data.json';

function checkIfTweetIdExists(tid) {
    var data = jsonfile.readFileSync(datafile);
    var result = _.findWhere(data, {tweet_id: tid});

    return result;
}

function saveTweet(tid) {
    var db = jsonfile.readFileSync(datafile);

    var new_tweet = {
        tweet_id: tid,
        created: moment().format("YYYY-MM-DD H:mm:ss")
    }
    db.push(new_tweet);

    jsonfile.writeFile(datafile, db, function (err) {
      console.error(err)
    });

    return new_tweet;
}

function processTweet(tweet_id, tweet_text) {
    var go_reply = false;
    var istweetsaved = checkIfTweetIdExists(tweet_id);

    // Tweet is not in our database
    if (!istweetsaved) {
        /*
            Check if tweet has our desired string
        */
        var matches = tweet_text.match(/\b(oras)(.*)\b/ig);

        if (matches) {
            // add to tweet_id to database
            saveTweet(tweet_id);
            console.log("Tweet " + tweet_id + " added to datastore.");

            // tell Twit to reply on the status
            go_reply = true;
        }

    } else {
        console.log(
            "This tweet has already been processed. \
            \nID: " + istweetsaved.tweet_id + " Created: " + istweetsaved.created
            );
    }

    return go_reply;
}

var jwucontroller = {
    checkIfTweetIdExists: checkIfTweetIdExists,
    saveTweet: saveTweet,
    processTweet: processTweet
}

module.exports = jwucontroller