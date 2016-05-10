/**
 * Created by galrettig on 5/10/16.
 */

var fs = require("fs");
var desktopPath = "/Users/galrettig/Desktop";
var amountOfFiles = -1;
var threshold = 3000;
var windowSize = 900000;

var scanAndMove = (function() {

    fs.readdir(desktopPath, function (err, res) {
        if (err) {
            console.log(err);

        } else {
            if (res.length === amountOfFiles) {
               // setting timeout on threshold
                setTimeout(scanAndMove, threshold);
                threshold = threshold * 2;

                if(threshold >= windowSize) {
                    // resetting the threshold
                    threshold = 3000;
                }

            } else {
                // checking files in given directory
                amountOfFiles = res.length;

                res.forEach(function (k) {
                    if (k.indexOf("Screen Shot") > -1) {
                        // found a file to move
                        var oldPath = desktopPath + "/" + k;
                        var newPath = desktopPath + "/screenshots/" + k;

                        fs.rename(oldPath, newPath, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("moved the file to -> " + newPath);
                                res.length--;
                            }

                        });
                    }
                });

                // finished scan and moved all files,  setting timeout on half of the threshold
                threshold = threshold / 2;
                setTimeout(scanAndMove, threshold);
            }
        }
    });
})();


