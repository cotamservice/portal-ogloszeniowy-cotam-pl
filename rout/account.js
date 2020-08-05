const express = require('express')
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model').User;

router.get('/registration/verify/email/:email', (req, res) => {
    let email = req.params.email;
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            res.json({success: false});
        } else {
            if (user) {
                res.json({success: true});
            } else {
                res.json({success: false});
            }
        }
    })
})
router.post('/registration/individual', (req, res) => {
    let roles = [require('../model').User.role.user, require('../model').User.role.individual]
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        roles: roles,
        secretWord: req.body.secretWord
    })
    User.addUser(newUser, (err) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    });
})

router.post('/authenticate', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw  err;
        if (!user) {
            return res.json({success: false});
        }
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw  err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), require('../config').passport.secretKey, {
                    expiresIn: 3600 * 24
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        email: user.email,
                        password: user.password,
                        roles: user.roles,
                        secretWord: user.secretWord
                    }
                });
            } else {
                return res.json({success: false});
            }
        });
    });


})
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Hello world from account/dashboard');
})

module.exports = router;