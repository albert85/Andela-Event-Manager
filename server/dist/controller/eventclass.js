'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing express lib


// import database


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../model/database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eventmanager = function () {
	function Eventmanager() {
		_classCallCheck(this, Eventmanager);
	}

	_createClass(Eventmanager, null, [{
		key: 'getNewEvent',
		value: function getNewEvent(req, resp) {

			return resp.json({ users: _database2.default.user });
		}

		// check for the validity of the parameter supplied

	}, {
		key: 'checkValidity',
		value: function checkValidity(req, resp, next) {
			// if()
		}
	}]);

	return Eventmanager;
}();

exports.default = Eventmanager;