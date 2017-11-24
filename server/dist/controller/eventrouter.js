'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../model/database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing eventclas
// import eventclassrouter from './eventclass.js'

// importing router for event and center manager
// importing express lib
var eventrouter = _express2.default.Router();

eventrouter.get('/', function (req, resp) {

        return resp.json({ users: _database2.default.user });
});
// get all events
// eventrouter.route('/')
// // .all()
//     .get(eventclassrouter.getNewEvent)


exports.default = eventrouter;