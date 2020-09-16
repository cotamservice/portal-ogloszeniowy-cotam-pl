const express = require('express');
const router = express.Router();
const Drive = require('../model').Drive;


router.get('/all', (req, res) => {
    Drive.getAll((err, result) => {
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
        new Drive({
            name: 'przedni'.toLowerCase(),
        }),
        new Drive({
            name: 'tylny'.toLowerCase(),
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