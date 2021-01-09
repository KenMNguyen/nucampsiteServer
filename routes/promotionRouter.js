const express = require('express');
const promotionRouter = express.Router();
const Promotion = require('../models/promotions');

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
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })

    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
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

    .post((req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/ ${req.params.promotionId}`);
    })
    .delete((req, res, next) => {
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




// promotionRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res) => {
//     res.end('Will send all the promotions to you');
// })
// .post((req, res) => {
//     res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
// })
// .put((req, res) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /promotions');
// })
// .delete((req, res) => {
//     res.end('Deleting all promotions');
// });

// //campsiteRouter.route()
// promotionRouter.route('/:promotionId')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res) => {
//     res.end(`Will send the promotion: ${req.params.promotionId} to you`);
// })
// .post((req, res) => {
//     // res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /promotions/ ${req.params.promotionId}`);
// })
// .put((req, res) => {
//     // res.statusCode = 403;
//     // res.end('PUT operation not supported on /campsites');
//     res.write(`Updating the promotion: ${req.params.promotionId}\n`);
//     res.end(`Will update the promotion: ${req.params.promotionId} with description: ${req.params.promotionId}`); 
// })
// .delete((req, res) => {
//     res.end(`Deleting promotion: ${req.params.promotionId}`);
// });


// module.exports = promotionRouter;