const express = require('express');
const router = express.Router();
const UserSubscription = require('../model').UserSubscription;
const Subscription = require('../model').Subscription;
const User = require('../model').User;

router.get('/all/:userId', (req, res) => {
    let userId = req.params.userId;
    UserSubscription.getSubscriptionByUserId(userId, (err, result) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true, result: result});
        }
    });
})
router.get('/save', (req, res) => {
    let uss = [];
    for (let i = 1; i < 4; ++i) {
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + i * 14);
        let us = new UserSubscription({
            postMade: i * 3,
            startIn: new Date(),
            endIn: endDate,
        });
        uss.push(us);
    }
    uss.forEach(ele => {
        User.getUserByEmail('Password2Password2@gmail.com', (err, user) => {
            if (user) {
                ele.userId = user._id;
                let subscriptionName = '';
                if (ele.postMade % 2 === 0) {
                    subscriptionName = 'Subscription#1';
                } else {
                    subscriptionName = 'Subscription#2';
                }
                Subscription.getSubscriptionByName(subscriptionName, (err, sub) => {
                    if (sub) {
                        ele.subscriptionId = sub._id;
                        ele.subscriptionName = sub.name;
                        ele.postAmount = sub.postAmount;
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
                });
            }
        });
    });
})
module.exports = router;