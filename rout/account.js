const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model').User;

router.get('/registration/verify/email/:email', (req, res) => {
    let email = req.params.email;
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            res.json({success: null});
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
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        secretWord: req.body.secretWord,
        isGoogleAuthenticate: req.body.isGoogleAuthenticate
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
        if (user.isGoogleAuthenticate) {
            const token = jwt.sign(user.toJSON(), require('../config').passport.secretKey, {
                expiresIn: 3600 * 24 * 356
            });
            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    email: user.email,
                    password: user.password,
                    roles: user.roles,
                    secretWord: user.secretWord,
                    isGoogleAuthenticate: user.isGoogleAuthenticate
                }
            });
        } else {
            User.comparePass(password, user.password, (err, isMatch) => {
                if (err) throw  err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), require('../config').passport.secretKey, {
                        expiresIn: 3600 * 24 * 356
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            email: user.email,
                            password: user.password,
                            roles: user.roles,
                            secretWord: user.secretWord,
                            isGoogleAuthenticate: user.isGoogleAuthenticate
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        }
    });
})

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Hello world from account/dashboard');
})

module.exports = router;