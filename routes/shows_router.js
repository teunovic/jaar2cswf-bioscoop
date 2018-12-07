let express = require('express');
let router = express.Router();
let ErrorResponse = require('../response_models/errorresponse');
let cinema = require('../models/cinema');
let mongoose = require('mongoose');
let util = require('../util/util');

router.get('/', function(req, res) {
    cinema.Show.find(req.query)
        .then(shows => {
            res.status(200).json(shows);
        })
        .catch(err => {
            console.error(err);
        })
});

router.all('/:id*', function(req, res, next) {
    let id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).json(new ErrorResponse(1, 'Invalid show id'));
        return;
    }

    cinema.Show.findById(id)
        .then(show => {
            if(!show) {
                res.status(404).json(new ErrorResponse(1, 'Show does not exist'));
                return;
            }
            res.locals.show = show;
            next();
        })
        .catch(err => {
            console.error(err);
        })
});

router.get('/:id', function(req, res) {
    res.status(200).json(res.locals.show);
});

router.all('/', function(req, res, next) {
    // admin check for all endpoints below; POST/PUT/DELETE
    if(!res.locals.user.isAdmin) {
        res.status(403).json(new ErrorResponse(1, 'No authorisation'));
        return;
    }
    next();
});

router.post('/', function(req, res) {
    let props = req.body;
    cinema.Show.create(props)
        .then(show => {
            res.status(200).json(show);
        })
        .catch(err => {
            res.status(409).json(new ErrorResponse(-1, err.message));
        })
});

router.delete('/:id', function(req, res) {
    res.locals.show.remove();
    res.status(200).json({});
});

router.put('/:id', function(req, res) {
    cinema.Show.findByIdAndUpdate(res.locals.show._id, req.body, {new: true})
        .then(updatedShow => {
            res.status(200).json(updatedShow);
        })
        .catch(err => {
            res.status(409).json(new ErrorResponse(-1, err.message));
        })
});




module.exports = router;