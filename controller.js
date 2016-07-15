var jsonfile = require('jsonfile');

function readDataFile(file) {
    jsonfile.readFile(file, function(err, obj) {
        console.log("Reading File...");
        for (var i = 0; i < obj.length; i++) {
            console.log(obj[i])
        }
        console.log("End file read. //");
    });
}

var jwucontroller = {
    readDataFile: readDataFile
}

module.exports = jwucontroller