var models = require('../models');

module.exports = {
    // 首页
    get_index: function(req, res) {
        res.render("member/index");
    },
    // 新增
    get_create: function(req, res) {

        models.Member.create({
            name: "百小僧"
        }).then(function() {
            res.render('member/create');
        });
    }
};