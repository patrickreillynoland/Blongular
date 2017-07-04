var db = require('../config/db');

exports.all = function() {
    return db.rows('GetPosts');
}
exports.read = function(id) {
    return db.row('GetPost', [id]);
}
exports.create = function(title, userid, categoryid, content) {
    return db.row('InsertPost', [title, userid, categoryid, content]);
}
exports.update = function(id, title, userid, categoryid, content) {
    return db.empty('UpdatePost', [id, title, userid, categoryid, content]);
}
exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}