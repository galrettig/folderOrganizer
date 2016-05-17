/**
 * Created by galrettig on 5/10/16.
 */

var fs = require("fs");
var desktopPath = "/Users/galrettig/Desktop";
var amountOfFiles = -1;
var threshold = 3000;
var windowSize = 900000;

var scanAndMove = function() {

    var checkIfNameContainsElement = function (fileName, arrayOfExtensions, predicateFunction) {
        for(var i = 0; i < arrayOfExtensions; i++){
            var currentElement = arrayOfExtensions[i];
            if(predicateFunction(fileName, currentElement)){
                return true;
            }
        }
        return false;
    };

    var isImage = function (fileName) {
        var predicate = function(subject, matcher){
            return (subject.indexOf(matcher) > -1);
        };
        return checkIfNameContainsElement(fileName, ['.png', '.jpg', '.jpeg', 'bmp'], predicate);
    };



    var moveFile = function(fileName, subDirPath){
        var oldPath = desktopPath + "/" + fileName;
        var newPath = desktopPath + subDirPath + fileName;

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("moved the file to -> " + newPath);
            }

        });
    };

    fs.readdir(desktopPath, function (err, res) {
        if (err) {
            console.log(err);

        } else {
            if (res.length === amountOfFiles) {
                console.log("setting Timeout with -> "  + (threshold / 1000) + " seconds");
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

                res.forEach(function (k, i) {
                    if (k.indexOf("Screen Shot") > -1) {
                        // found a file to move
                        moveFile(k, "/screenshots/");
                        res--;
                    }
                    else if(k.indexOf(".pdf") > -1){
                        moveFile(k, "/pdf/");
                        res--;
                    }
                    else if(isImage(k)){
                        moveFile(k, "/images/");
                        res--;
                    }
                    if(i === res.length - 1){}

                });

                // finished scan and moved all files,  setting timeout on half of the threshold
                threshold = threshold / 2;
                console.log(scanAndMove);
                setTimeout(scanAndMove, threshold);
            }
        }
    });
};

scanAndMove();

