var express = require('express');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var passport = require('passport');

var router = express.Router();

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            console.log(err); 
            return res.sendStatus(500); 
        }    
        if (!user) { 
            return res.status(401).send(info); 
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.sendStatus(500); 
            } else { 
                return res.send(user); 
            }
        });
    })(req, res, next);
});  

router.all('*', auth.isLoggedIn)

router.get('/logout', function (req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function (req, res) {
    res.send(req.user);
});


router.route('/')
    .get(auth.isAdmin, function(req, res, next) {
        next();
    }, auth.isLoggedIn, function(req, res) { //.get(auth.isLoggedIn) is itself a middleware
        procedures.all()
        .then(function(users) {
            res.send(users);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

router.get('/me', function(req, res) {
    res.send(req.user);
    });

router.route('/:id')
    .get(auth.isAdmin, function(req, res) {
        procedures.read(req.params.id)
        .then(function(user) {
            res.send(user);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

// NOTE: cannot do something like router.route('/me') here; it wouldn't make it here because it'd read 'me' as the id

module.exports = router;