const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model').User;
const Company = require('../model').Company;
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