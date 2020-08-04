const express = require('express')
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model').User;

router.post('/registration/individual', (req, res) => {
    let roles = [require('../model').User.role.user,require('../model').User.role.individual]
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        roles: roles,
        secretWord: req.body.secretWord
    })
    User.addUser(newUser, (err, user) => {
        console.log('in add user:' +user);
        if (err) {
            res.json({success: false, msg: "User was not added"});
        } else {
            res.json({success: true, msg: "User was added"});
        }
    });
})

router.post('/authenticate', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw  err;
        if (!user) {
            return res.json({success: false, msg: "User dont exist"});
        }
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw  err;
            if (isMatch) {
                const token = jwt.sign(user, config.passport.secretKey, {
                    expiresIn: 3600 * 24
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: "User password not match"});
            }
        });
    });


})
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Hello world from account/dashboard');
})

module.exports = router;