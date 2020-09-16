const express = require('express');
const router = express.Router();
const Equipment = require('../model').Equipment;


router.get('/all', (req, res) => {
    Equipment.getAll((err, result) => {
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
        new Equipment({
            name: 'ABS'.toLowerCase(),
        }),
        new Equipment({
            name: 'CD'.toLowerCase(),
        }),
        new Equipment({
            name: 'Elektrochromatyczne lusterko wsteczne'.toLowerCase(),
        }),
        new Equipment({
            name: 'CD'.toLowerCase(),
        }),
        new Equipment({
            name: 'ABS'.toLowerCase(),
        }),
        new Equipment({
            name: 'CD'.toLowerCase(),
        }),
        new Equipment({
            name: 'Elektrochromatyczne lusterko wsteczne'.toLowerCase(),
        }),
        new Equipment({
            name: 'CD'.toLowerCase(),
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