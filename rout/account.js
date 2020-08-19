const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model').User;
const Company = require('../model').Company;
const Salon = require('../model').Salon;

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
        isGoogleAuthenticate: req.body.isGoogleAuthenticate,
        isFBAuthenticate: req.body.isFBAuthenticate,
    })
    User.addUser(newUser, (err) => {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    });
})
router.post('/registration/commission', (req, res) => {
    let userBody = req.body[0];
    let newUser = new User({
        email: userBody.email,
        password: userBody.password,
        roles: userBody.roles,
        secretWord: userBody.secretWord,
        isGoogleAuthenticate: userBody.isGoogleAuthenticate,
        isFBAuthenticate: userBody.isFBAuthenticate,
    });

    let companyBody = req.body[1];
    let newCompany = new Company({
        nip: companyBody.nip,
        nipEu: companyBody.nipEu,
        name: companyBody.name,
        personName: companyBody.personName,
        personSurname: companyBody.personSurname,
        country: companyBody.country,
        address: companyBody.address,
        zip: companyBody.zip,
        city: companyBody.city,
        phone: companyBody.phone,
        creatorId: newUser._id,
    });

    let salonBody = req.body[2];
    let newSalon = new Salon({
        name: salonBody.name,
        country: salonBody.country,
        address: salonBody.address,
        zip: salonBody.zip,
        city: salonBody.city,
        phones: salonBody.phones,
        creatorId: newUser._id,
    });
    (async () => {
        const session = await mongoose.connection.startSession();
        let err = '';
        try {
            session.startTransaction();
            newUser.password = await User.cryptPassword(newUser.password);
            await User.create([newUser], {session: session});
            await Company.create([newCompany], {session: session});
            await Salon.create([newSalon], {session: session});
            await session.commitTransaction();
        } catch (e) {
            err = e;
            console.log(e.message);
        } finally {
            session.endSession();
        }
        if (!err) {
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    })();
})

router.post('/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw  err;
        if (!user) {
            return res.json({success: false});
        }
        if (user.isGoogleAuthenticate || user.isFBAuthenticate) {
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
                    isGoogleAuthenticate: user.isGoogleAuthenticate,
                    isFBAuthenticate: user.isFBAuthenticate,
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