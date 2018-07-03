var Users = require('../models/Users');
var bcrypt = require('bcrypt');

exports.form = function (req, res) {
	res.render('register', { title: '注册' });
};

exports.submit = function (req, res, next) {
	var name = req.body.name;
	var pass = req.body.pass;
	Users.findOne({username: name}, function (err, user) {
		if (err) return next(err);    // 顺序传递数据库连接错误和其他错误
		if (user) {   // 用户名已经被占用
			res.error('用户名已经存在！');
			res.redirect('back')
		} else {
					Users.create({
						username: name,
						password: pass
					}, function (err, user) {
							if (err) return next(err);
							req.session.uid = user._id;
							res.redirect('/');    // 重定向到首页
					});
		};
	});
};