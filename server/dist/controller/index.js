'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _eventrouter = require('./eventrouter.js');

var _eventrouter2 = _interopRequireDefault(_eventrouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the event center router
// import center from './centerrouter.js'

// importing router for event and center manager
// importing express lib
var router = _express2.default.Router();

// creating api for event and center manager


// importing the event router
router.use('/api/v1/users/events', _eventrouter2.default);
// router.use('/api/v1/admin/centers',center)

exports.default = router;