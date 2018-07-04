var Entries = require('../models/Entries');

exports.list = function (req, res, next) {
	var page = req.page;
	Entries.find({}).populate('user').exec(function (err, entries) {
		if (err) return next(err);

		var array = [];
		for(var count = page.from; count <= page.to; count++){
			if(entries[count]){
				array.push(entries[count]);
			}
		}

		res.render('entries', {
			title: 'Entries',
			entries: array,
		})
	});
};

exports.form = function (req, res) {
	res.render('post', { title: 'Post'});
};

exports.submit = function (req, res, next) {
	var title = req.body.title;
	var body = req.body.body;

	Entries.create({
		title: title,
		body: body,
		user: req.session.uid
	}, function (err, entry) {
		if (err) return next(err);

		res.redirect('/');
	})
};