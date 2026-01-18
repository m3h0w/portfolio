var fs = require('fs'),
    ejs = require("ejs");

function ejs2html(path, information) {
    ejs.renderFile(path, function (err, html) {
        if (err) {
            console.log("ERROR: " + err);
            return false;
        }
        fs.writeFile(path + '.html', html, function (err) {
            if (err) {
                console.log(err);
                return false
            }
            return true;
        });
    })
}

ejs2html(__dirname+"/templates/test.ejs")