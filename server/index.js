var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bloguser',
    password: 'blog123',
    database: 'AngularBlog'
});

var clientPath = path.join(__dirname, '../client');

var app = express();
app.use(express.static(clientPath));

app.use(bodyParser.json());

app.route('/api/posts')
    .get(function(req, res) {
        rows('GetPosts')
        .then(function(posts) {
            res.send(posts);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });
    // .post(function(req, res) {
    //     var newChirp = req.body;
    //     row('InsertChirp', [newChirp.message, newChirp.userid])
    //     .then(function(id) {
    //         res.status(201).send(id);
    //     }).catch(function(err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //     });
    // });
// app.route('/api/chirps/:id')
//     .get(function(req, res) {
//         row('GetChirp', [req.params.id])
//         .then(function(chirp) {
//             res.send(chirp);
//         }).catch(function(err) {
//             console.log(err);
//             res.sendStatus(500);
//         });
//     }).put(function(req, res) {
//         empty('UpdateChirp', [req.params.id, req.body.message])
//         .then(function() {
//             res.sendStatus(204);
//         }).catch(function(err) {
//             console.log(err);
//             res.sendStatus(500);
//         });
//     }).delete(function(req, res) {
//         empty('DeleteChirp', [req.params.id])
//         .then(function() {
//             res.sendStatus(204);
//         }).catch(function(err) {
//             console.log(err);
//             res.sendStatus(500);
//         });
//     });

// app.get('/api/users', function(req, res) {
//     rows('GetUsers')
//     .then(function(users) {
//         res.send(users);
//     }).catch(function(err) {
//         console.log(err);
//         res.sendStatus(500);
//     });
// });

app.listen(3000);

function callProcedure(procedureName, args) {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                var placeholders = '';
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) { // if we are on the last argument in the array
                            placeholders += '?';
                        } else {
                            placeholders += '?,';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + placeholders + ');'; // CALL GetChirps();, or CALL InsertChirp(?,?,?);
                connection.query(callString, args, function(err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}

function rows(procedureName, args) {
    return callProcedure(procedureName, args)
    .then(function(results) {
        return results[0];
    });
}