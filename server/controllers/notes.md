const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDetails = require("../models/user");
const passport = require('passport');
require('../config/passport-local-strategy');

module.exports.success = (req, res) => {
    console.log("user", req.user);
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
        })
    }
}

module.exports.failure = (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    })
}

module.exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log("signin", user);
        if (err) throw err;
        if (!user) res.status(400).send({ message: "No user found" });
        
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.status(200).send({ message: "successfully authenticated",user:{name:user.name,email:user.email} });
            })
        }
        console.log("userchk", req.isAuthenticated(),req.user);
    })(req, res, next);
}

module.exports.signup = async (req, res) => {
    console.log("signup");
    const { email, password, fname, lname, confirmPassword } = req.body;
    try {
        const existingUser = await userDetails.findOne({ email });
        if (existingUser) return res.status(400).send({ message: "user already exists" });
        if (password != confirmPassword) return res.status(400).send({ message: "passwords dont match" });
        await userDetails.create({ email, password, name: `${fname} ${lname}` });

        return res.status(200).send({ message: "user registered successfully" })
    } catch (err) {
        res.status(500).send({ message: "something went wrong" })
    }

}

module.exports.signout = async (req, res) => {
    // console.log(req,req.logout());
    if (req.session.passport) { delete req.session.passport; }

}