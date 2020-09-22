const express = require('express');
const router = express.Router();
const Subscription = require('../model').Subscription;

router.get('/all', (req, res) => {
    Subscription.getAll((err, result) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true, result: result});
        }
    });
})
router.get('/save', (req, res) => {
    let pros = [
        new Subscription({
            name: 'Subscription#1',
            postAmount: 10,
            description: 'Subscription#1 description',
        }),
        new Subscription({
            name: 'Subscription#2',
            postAmount: 20,
            description: 'Subscription#2 description',
        }),
    ]
    pros.forEach(ele => {
        Subscription.getSubscriptionByName(ele.name, (err, mark) => {
            if (!mark) {
                ele.save(err => {
                    if (err) {
                        res.json({success: false});
                    } else {
                        res.json({success: true});
                    }
                });
            } else {
                res.json({success: false});
            }
        })
    })
})
module.exports = router;