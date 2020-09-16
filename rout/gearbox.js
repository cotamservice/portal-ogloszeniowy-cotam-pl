const express = require('express');
const router = express.Router();
const GearBox = require('../model').GearBox;


router.get('/all', (req, res) => {
    GearBox.getAll((err, result) => {
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
        new GearBox({
            name: 'automatyczna'.toLowerCase(),
        }),
        new GearBox({
            name: 'manualna'.toLowerCase(),
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