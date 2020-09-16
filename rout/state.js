const express = require('express');
const router = express.Router();
const State = require('../model').State;


router.get('/all', (req, res) => {
    State.getAll((err, result) => {
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
    console.log('TRY SAVE STATE');
    let states = [
        new State({
            name: 'Nowy'.toLowerCase(),
        }),
        new State({
            name: 'Urzywany'.toLowerCase(),
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