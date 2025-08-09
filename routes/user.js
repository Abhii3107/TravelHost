const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");


const userController = require("../controllers/users.js")
//signup page
router.get("/signup",userController.renderSignupForm);

router.post("/signup", 
    wrapAsync(userController.signup));

//login page
router.get("/login" , userController.renderLoginForm );

router.post("/login" , saveRedirectUrl, // to save originalurl in req.seesion.redirecturl before authentication
    passport.authenticate('local', 
        { 
        failureRedirect: '/login',
        failureFlash: true,        
    }),
   userController.login
);

router.get("/logout", userController.logout )

module.exports= router;
``