const express = require('express');
const router = express.Router();
const Salon = require('../model').Salon;


router.get('/all/:creatorId', (req, res) => {
    let creatorId = req.params.creatorId;
    Salon.getAllByUserId(creatorId, (err, result) => {
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

module.exports = router;