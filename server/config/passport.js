const passport = require("passport");
const userDetails = require("../models/user");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '959818041316-5ovvcs1klpkcm8uiq895jk3uvmorblpn.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

// local
passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async function (email, password, done) {
        console.log("pass", password, email, done)
        try {
            const user = await userDetails.findOne({ email: email });
            // console.log("userchk", user)
            if (!user) {
                return done(null, false);
            }
            const checkPswd = user.password == password;
            // console.log("chkpwd", user.password,password,checkPswd)
            if (!checkPswd) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            // console.log("errr", err)
            return done(err);
        }
    }
));


// google
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        done(null, profile)
        // const user = {
        //     username: profile.displayName,
        //     avatar: profile.photos[0],
        // };

    }
));


passport.serializeUser((user, done) => {
    console.log("hi")
    done(null, user);
    // process.nextTick(function () {
    //     return done(null,user.id);
    // });
});
passport.deserializeUser((user, done) => {
    console.log("deser", user)
    done(null, user)
});

passport.checkAuthentication = (req, res, next) => {
    console.log("session", req.session.passport)
    if (req.isAuthenticated()) {
        console.log("check")
        return next();
    }
    console.log("fail")
    return res.redirect('/auth')
}

passport.setAuthenticatedUser = (req, res, next) => {
    console.log("set user", req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log("ft", req.user)
        res.locals.user = req.user;
    }
    next()
}

module.exports = passport;