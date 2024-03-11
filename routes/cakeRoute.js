const express = require('express');
const bodyParser = require('body-parser');

const Cake = require('../models/cake');
const topping = require('../models/topping');
var authenticate = require('../authenticate');


const cakeRoute = express.Router();
cakeRoute.use(bodyParser.json());

cakeRoute.route('/')
    .get(authenticate.verifyOrdinaryUser, (req, res, next) => {
        Cake.find({})
            .populate('topping')
            .then((cake) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.create(req.body)
            .then((cake) => {
                console.log('Cake Created: ', cake);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /cake');
    })
    .delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.deleteMany()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    cakeRoute.route('/:cakeId')
    .get(authenticate.verifyOrdinaryUser, (req, res, next) => {
        Cake.findById(req.params.cakeId )
            // .populate('topping')
            .then((cake) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.end("POST operation not supported on /cake/" + req.params.cakeId );
    })
    .put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.findByIdAndUpdate(req.params.cakeId , {$set: req.body}, {new: true})
            .populate('topping')
            .then((cake) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Cake.findByIdAndRemove(req.params.cakeId)
            .populate('topping')
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = cakeRoute;