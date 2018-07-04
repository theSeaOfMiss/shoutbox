var Users = require('../models/Users');

exports.form = function (req, res) {
	res.render('login', { title: '登入' });
};

exports.submit = function (req, res, next) {
	var name = req.body.name;
	var pass = req.body.pass;

	Users.findOne({ username: name }, function (err, user) {
		if (err) return next(err);

		if (user) {   // 表示用户存在
			user.comparePassword(pass, function (err, isMatch) {    // 比较密码
				if (err) throw err;

				if (isMatch) {    // 如果密码匹配
					req.session.uid = user._id;
					res.redirect('/')
				} else {    // 如果密码不匹配
					res.error('密码错误！');
					res.redirect('back');
				}
			});
		} else {    // 表示该用户不存在
			res.error('该用户不存在！');
			res.redirect('back');
		}
	});
};

exports.logout = function (req, res) {    // 推出session
	req.session.destroy(function (err) {
		if (err) throw err;
		res.redirect('/')
	});
};