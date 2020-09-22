const express = require('express');
const router = express.Router();
const Promotion = require('../model').Promotion;

router.get('/all', (req, res) => {
    Promotion.getAll((err, result) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true, result: result});
        }
    });
})
router.get('/save', (req, res) => {
    let pros = [
        new Promotion({
            id: '1',
            name: 'Pakiet#1',
            duration: 10,
        }),
        new Promotion({
            id: '2',
            name: 'Pakiet#2',
            duration: 20,
        }),
    ]
    pros.forEach(ele => {
        Promotion.getPromotionByName(ele.name, (err, mark) => {
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