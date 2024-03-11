const express = require('express');
const bodyParser = require('body-parser');

const Quiz = require('../models/quiz');
var authenticate = require('../authenticate');


const quizRoute = express.Router();
quizRoute.use(bodyParser.json());

quizRoute.route('/')
    .get((req, res, next) => {
        Quiz.find({})
            .populate('question')
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        req.body.author = req.user._id;
        Quiz.create(req.body)
            .then((quiz) => {
                console.log('Quiz Created: ', quiz);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /quiz');
    })
    .delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Quiz.deleteMany()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

quizRoute.route('/:quizId')
    .get((req, res, next) => {
        Quiz.findById(req.params.quizId )
            // .populate('author')
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.end("POST operation not supported on /quiz/" + req.params.quizId );
    })
    .put(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Quiz.findByIdAndUpdate(req.params.newsId , {$set: req.body}, {new: true})
            // .populate('author')
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Quiz.findByIdAndRemove(req.params.newsId)
            // .populate('author')
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


    // newsRoute.route('/status')
    // .get((req, res, next) => {
    //     News.find({status:  true })
    //         // .populate('author')
    //         .then((news) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(news);
    //         }, (err) => next(err))
    //         .catch((err) => next(err));
    // });
module.exports = quizRoute;