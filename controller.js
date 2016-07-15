var jsonfile = require('jsonfile');
var _ = require('underscore');
var moment = require('moment');

var datafile = './data.json';

function readDataFile(file) {
    jsonfile.readFile(file, function(err, obj) {
        if (!err) { return obj; }
    });
}

function checkIfTweetIdExists(tid) {
    var data = readDataFile(datafile);
    var result = _.findWhere(data, {tweet_id: tid});

    return result;
}

var jwucontroller = {
    readDataFile: readDataFile,
    checkIfTweetIdExists: checkIfTweetIdExists,
}

module.exports = jwucontroller