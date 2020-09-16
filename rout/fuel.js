const express = require('express');
const router = express.Router();
const Fuel = require('../model').Fuel;


router.get('/all', (req, res) => {
    Fuel.getAll((err, result) => {
        if (err) {
            res.json({success: null});
        } else {
            if (result) {
                res.json({success: true, result: result});
            } else {
                res.json({success: false});
            }
        }
    })
})

router.get('/save', (req, res) => {
    let states = [
        new Fuel({
            name: 'diesel'.toLowerCase(),
        }),
        new Fuel({
            name: 'benzyna'.toLowerCase(),
        }),
    ];

    states.forEach(ele => {
        ele.save(err => {
            if (err) {
                res.json({success: false});
            } else {
                res.json({success: true});
            }
        });
    })
})

module.exports = router;