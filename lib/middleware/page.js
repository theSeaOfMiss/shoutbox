module.exports = function (fn, perpage) {   // perpage为每页最大评论
	perpage = perpage || 10;        // perpage默认为10，可以设置；
	return function (req, res, next) {
		var page = Math.max(
			parseInt(req.param('page') || '1', 10),
			1
		) - 1;

		fn(function (err, total) {
			if (err) return next(err);

			req.page = res.locals.page = {
				number: page,   // 页码-1
				perpage: perpage,   // 每页最大评论数
				from: page * perpage,
				to: page * perpage + perpage - 1,
				total: total,   // 数据库里面的数据总数
				count: Math.ceil(total / perpage)   // 最多页数
			};
			next();
		})
	}
};