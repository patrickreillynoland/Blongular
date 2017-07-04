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
exports.update = function(id, message) {
    // TODO: fix this - return db.empty('UpdatePost', [id, message]);
}
exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}