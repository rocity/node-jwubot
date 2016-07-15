// requires
var jwu = require('./controller.js');

function processTweet(tweet_id) {
    // data storage
    var datafile = './data.json';

    // test vars
    var tweet_id = 997;
    var greetings = {
        morning: 'Good morning!',
        noon: 'Good noon!',
        afternoon: 'Good afternoon!',
        evening: 'Good evening!'
    }

    var istweetsaved = jwu.checkIfTweetIdExists(tweet_id);

    // Tweet is not in our database
    if (!istweetsaved) {
        // reply to tweet


        // add to tweet_id to database
        jwu.saveTweet(tweet_id);
        console.log("Tweet " + tweet_id + " added to datastore.");
    } else {
        console.log(
            "This tweet has already been processed. \
            \nID: " + istweetsaved.tweet_id + " Created: " + istweetsaved.created
            );
    }
}

var justwokeup = {
    processTweet: processTweet
}

module.exports = justwokeup