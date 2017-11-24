'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./controller/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiating express
var app = (0, _express2.default)();

// configuring body-parser to json property


// importing event and center route
// importing express and body-parser library
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// configuring the event and center route
app.use(_index2.default);

// listening to server at port localhost:3000
app.listen(3000, function () {
    console.log("server listening");
});