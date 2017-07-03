var db = require('../config/db');

exports.all = function() {
    return db.rows('GetPosts');
}
exports.read = function(id) {
    return db.row('GetPost', [id]);
}

//TODO : Add Create + Update

exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}