function getField(req, field) {
	var val = req.body;
	val = val[field];
	return val;
}

exports.required = function (field) {
	return function (req, res, next) {
		if (getField(req, field)) {
			next();
		} else {
			res.error(field + ' ' + ' is required');
			res.redirect('back');
		}
	}
};

exports.lengthAbove = function (field, len) {
	return function (req, res, next) {
		if (getField(req, field).length > len) {
			next();
		} else {
			res.error(field+ ' ' + ' must have more than'
				+ len + ' characters');
			res.redirect('back');
		}
	}
};

exports.auth = function (req, res, next) {
	if (req.session.uid) {
		next();
	} else {
		res.error('执行此操作请先登入');
		res.redirect('login');
	}
}