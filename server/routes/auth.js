const express = require("express");
const usersController = require("../controllers/auth");
const passport = require("passport");
const router = express.Router();
const CLIENT_URL = 'http://localhost:3000/';
const userDetails = require('../models/user');



router.get('/getUser', passport.checkAuthentication, (req, res) => {
    console.log("success", req.user);
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
        })
    }
})

router.get('/logout', (req, res) => {
    console.log("1", req.session)
    req.logout()
    req.session = null

    res.status(200).json({
        message:"Logged out"
    })
    // req.logout(function (err) {
    //     // console.log(req.isAuthenticated())
    //     if (err) next(err);
    //     // console.log("2",req.isAuthenticated())
    //     return res.status(200).json({
    //         success: true,
    //         message:"logged out"
    //     });
    // });
})

// local
router.post('/locallogin', (req, res, next) => {
    console.log("login")
    passport.authenticate('local', (err, user, info) => {
        console.log("signin", user);
        if (err) throw err;
        if (!user) res.status(201).send({ message: "No user found, please check your credentials" });

        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.status(200).send({ message: "successfully authenticated", user });
            })
        }
        // console.log("userchk", req.isAuthenticated(), req.user);
    })(req, res, next);
});

router.post('/register', async (req, res) => {
    // console.log("signup",req.body);
    const { email, password, fname, lname, confirmPassword } = req.body;
    try {
        const existingUser = await userDetails.findOne({ email });
        console.log(existingUser);
        if (existingUser) return res.status(201).send({ message: "user already exists" });
        if (password != confirmPassword) return res.status(201).send({ message: "passwords dont match" });
        await userDetails.create({ email, password, name: `${fname} ${lname}` });

        return res.status(200).send({ message: "user registered successfully" })
    } catch (err) {
        res.status(500).send({ message: "something went wrong" })
    }

})
// google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: "/login/failed"
}),
    function (req, res) {
        res.redirect(CLIENT_URL);
    }
);

module.exports = router;