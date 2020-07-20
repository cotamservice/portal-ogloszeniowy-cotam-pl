const express = require('express')
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model').User;

router.post('/reg', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles,
        email: req.body.email
    })
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: "User was not added"});
        } else {
            res.json({success: true, msg: "User was added"});
        }
    });
})

router.post('/auth', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw  err;
        if (!user) {
            return res.json({success: false, msg: "User dont exist"});
        }
        User.comparePass(password, user.password, (err, isMatch)=>{
            if (err) throw  err;
            if(isMatch){
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