const express = require('express');
const promotionRouter = express.Router();
const Promotion = require('../models/promotions');
const authenticate = require('../authenticate');

promotionRouter.route('/')

    .get((req, res, next) => {
        Promotion.find()
            .then(promotions => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })

    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotion.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

//promotionRouter.route()
promotionRouter.route('/:promotionId')
    .get((req, res, next) => {
        Promotion.findById()
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/ ${req.params.promotionId}`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotion.delete(req.body)
            .then(promotion => {
                console.log('promotion deleted', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    });

module.exports = promotionRouter;


