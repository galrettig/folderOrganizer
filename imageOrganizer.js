/**
 * Created by galrettig on 5/22/16.
 */

var fs = require("fs");
var util = require("util");
var targetPath = process.argv[2];//"/Users/galrettig/";
var outputPath = process.argv[3];//"/Users/galrettig/Desktop";

var a = "/Users/galrettig/OneDrive/photos backup/photos back up 1 of 4/samsung backup/Pictures/2010-12-29 19.44.35.jpg";
var b = "/Users/galrettig/OneDrive/photos backup/ALL/Uplay/Pictures/dropbox/2010-12-29 19.44.35.jpg";

var scanAndMove = function () {

    var getStatsForArrayOfImages = function (arrayOfPaths) {
        var statArray = [];
        var dateArray = [];

        for(var i = 0; i < arrayOfPaths.length; i++){
            var element = fs.statSync(arrayOfPaths);
            statArray[i] = element;
            dateArray[i] = new Date(util.inspect(element.birthtime));
        }
        return {statArray : statArray, dateArray : dateArray};
    };

    var compareDates = function (dateArray) {
        var indexOfSmallestBirthtime = -1;
        var valueOfSmallestBirthtime = -1;

        for(var i = 0; i < dateArray.length; i++){
            if(i === 0){
                indexOfSmallestBirthtime = i;
                valueOfSmallestBirthtime = dateArray[i].getTime();
            } else {
                if(dateArray[i].getTime() < valueOfSmallestBirthtime){
                    indexOfSmallestBirthtime = i;
                    valueOfSmallestBirthtime = dateArray[i].getTime();
                }
            }
        }
        return indexOfSmallestBirthtime;
    };

    


    var moveFile = function (fileName, subDirPath) {
        var oldPath = targetPath + "/" + fileName;
        var newPath = targetPath + subDirPath + fileName;

       /* fs.rename(oldPath, newPath, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("moved the file to -> " + newPath);
            }

        });*/
    };

    fs.readdir(targetPath, function (err, res) {
        if (err) {
            console.log(err);

        } else {
            res.forEach(function (k, i) {
                fs.stat(targetPath + "/" + k, function (err, stat) {
                    console.log(stat);
                });

            });

        }
    });
};

scanAndMove();

