const express = require('express');
const bodyParser = require('body-parser');

const News = require('../models/news');
var authenticate = require('../authenticate');


const newsRoute = express.Router();
newsRoute.use(bodyParser.json());

newsRoute.route('/')
    .get((req, res, next) => {
        News.find({})
            .populate('author', "firstname")
            .then((news) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        req.body.author = req.user._id;
        News.create(req.body)
            .then((news) => {
                console.log('News Created: ', news);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /news');
    })
    .delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        News.deleteMany()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

newsRoute.route('/:newsId')
    .get((req, res, next) => {
        News.findById(req.params.newsId )
            // .populate('author')
            .then((news) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.end("POST operation not supported on /news/" + req.params.newsId );
    })
    .put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        News.findByIdAndUpdate(req.params.newsId , {$set: req.body}, {new: true})
            // .populate('author')
            .then((news) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        News.findByIdAndRemove(req.params.newsId)
            // .populate('author')
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


    newsRoute.route('/status')
    .get((req, res, next) => {
        News.find({status:  true })
            // .populate('author')
            .then((news) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports = newsRoute;