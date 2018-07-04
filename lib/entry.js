var Entries = require('../models/Entries');

exports.count = function (fn) {
	Entries.count({}, fn);
};