let express = require('express');
let bcrypt = require('bcrypt');
let router = express.Router();
let ErrorResponse = require('../response_models/errorresponse');
let users = require('../models/users');
let jwt = require('../util/jwt');


router.post('/login', function(req, res) {
    let username = String(req.body.username) || '';
    let password = String(req.body.password) || '';

    users.User.findOne({username: username, password: password})
        .then(user => {
            if(!user) {
                res.status(403).json(new ErrorResponse(1, "Incorrect username or password"));
                return;
            }
            res.json({ token: jwt.encode(user._id) });
        })
        .catch(err => {
            res.status(409).json(new ErrorResponse(-1, err.message));
        })
});

router.post('/register', function(req, res) {
    let username = req.body.username;
    let password = String(req.body.password) || '';

    if(!password.match("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
        res.status(409).json(new ErrorResponse(1, 'Password must be eight characters or more, and contain at least one letter and one number'));
        return;
    }

    bcrypt.hash(password, 10, function(err, hash) {
        if(err) {
            console.error(err);
            res.status(503).json(new ErrorResponse(-1, 'Something unexpected went wrong'));
            return;
        }
        users.User.create({username: username, hashed_password: hash})
            .then(user => {
                console.log(user);
                res.json({token: jwt.encode(user._id)});
            })
            .catch(err => {
                console.log(err);
                if(err.code === 11000) {
                    res.status(409).json(new ErrorResponse(2, 'Username is already taken'));
                    return;
                }
                res.status(409).json(new ErrorResponse(1, err.message));
            })
    });
});


router.all('*', function(req, res, next) {
    let token = req.get('Authorization');
    if(!token) {
        res.status(403).json(new ErrorResponse(1, 'Did not provide authorization token'));
        return;
    }

    let id = jwt.decode(token);
    if(!id) {
        res.status(403).json(new ErrorResponse(2, 'Invalid authorization token'));
        return;
    }

    users.User.findById(id)
        .then(user => {
            if(!user) {
                res.status(403).json(new ErrorResponse(3, 'Invalid authorization token'));
                return;
            }
            res.locals.user = user;
            console.log(user.username + ' authorized');
            next();
        })
});



module.exports = router;