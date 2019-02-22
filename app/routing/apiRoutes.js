// LOAD DATA
var friendsData = require("../data/friends.js");

// ROUTING
module.exports = function (app) {
    // API GET Requests
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    app.post("/api/friends", function (req, res) {

        var userInput = req.body;
        var compArray = [];
        var compInt = compArray[0];
        var friendIndex = 0;

        for (var i = 0; i < userInput.scores.length; i++) {
            userInput.scores[i] = parseInt(userInput.scores[i]);
        }
        console.log(userInput);

        for (var k = 0; k < friendsData.length; k++) {
            var possibleFriend = friendsData[k];
            var totalDifference = 0;

            for (var m = 0; m < possibleFriend.scores.length; m++) {
                var scoreDifference = Math.abs(possibleFriend.scores[m] - userInput.scores[m]);
                totalDifference += scoreDifference;
            }
            compArray[k] = totalDifference;
        }

        for (var t = 1; t < compArray.length; t++) {
            if (compArray[t] < compInt) {
                compInt = compArray[t];
                friendIndex = t;
            }
        }
        console.log(friendsData[friendIndex]);


        friendsData.push(userInput);
        // res.json(friendsData);
        res.json(friendsData[friendIndex]);

    });
};
