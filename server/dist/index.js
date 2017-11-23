"use strict";

var _database = require("../database");

var user = {
    "id": 3,
    "name": "burial",
    "location": "Lagos Island",
    "startTime": "1.00AM",
    "endTime": "2.00AM"
};

_database.database.push(user);
console.log(_database.database.user);