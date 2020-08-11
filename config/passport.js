const User = require('../model').User;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const secretKey = 'superSecretKey';

module.exports = {
    configUse: (app, passport) => {
        app.use(passport.initialize());
        app.use(passport.session());
    },
    secretKey: secretKey,
    passport: (passport) => {
        let opts = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = secretKey;
        passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            User.findOne({id: jwt_payload.sub}, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    },
}
