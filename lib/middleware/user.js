var Users = require(global.__base + 'models/Users');

module.exports = function (req, res, next) {
	var uid = req.session.uid;
	if (!uid) return next();

	Users.findOne({_id: uid}, function (err, user) {
		if (err) return next(err);
		req.user = res.locals.user = user;
		next()
	})
};