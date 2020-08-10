const User = require('../model').User;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const secretKey = 'superSecretKey';
const GOOGLE_CLIENT_ID = '216771643471-695lth4b4nhl4qmqiqmjpkodtdfgpefb.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'ogb0F_FTo6gWet9Mv-mhysTp';

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
    passportGoogle: (passport) => {
        passport.use(new GoogleStrategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://www.example.com/auth/google/callback"
            },
            function (accessToken, refreshToken, profile, cb) {
            console.log('id:'+profile.id);
            console.log('email:'+profile.email);
                // User.findOrCreate({googleId: profile.id}, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));
    }
}
