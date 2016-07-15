// requires
var jwu = require('./controller.js');

// data storage
var datafile = './data.json';

// test vars
var tweet_id = 999;
var greetings = {
    morning: 'Good morning!',
    noon: 'Good noon!',
    afternoon: 'Good afternoon!',
    evening: 'Good evening!'
}

// var result = jwu.readDataFile(datafile);

var istweetsaved = jwu.checkIfTweetIdExists(tweet_id);

console.log(istweetsaved);