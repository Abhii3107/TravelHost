const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

//signup page
router.get("/signup",(req,res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup", 
    wrapAsync(async(req,res) =>{
    try{
    let {username,email,password} = req.body;
     const newUser = new User({email,username});
     const registeredUser = await  User.register(newUser , password);
    
     req.login(registeredUser , (err) =>{       //req.login(kiske liye, aur kya krwanachahte hai)
        if(err){
          return next(err);                   //req.login - automatically signup krte hi login ho jayega
        }
     req.flash("success" , "Welcome to TravelHost");
     res.redirect("/listings");
     });
     console.log(registeredUser);
    
    }
    catch(e){
        req.flash("error" ,e.message );
        res.redirect("/signup");
    }
}));

//login page
router.get("/login" , (req,res) => {
      res.render("users/login.ejs");
});

router.post("/login" , saveRedirectUrl, // to save originalurl in req.seesion.redirecturl before authentication
    passport.authenticate('local', 
        { 
        failureRedirect: '/login',
        failureFlash: true,        
    }),
    async(req,res) =>{
        req.flash("success" , "welcome back to TravelHost");
        // res.redirect("/listings");
        let redirectUrl = res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req,res) =>{
    req.logout((err) =>{         // req.logout()- ye method apne aap mai callback ko leta hai as a parameter  
        if(err){                 // callback- jaise hi user logout ho jaye , immediately kya kaam hona chayie , we write in callback
            return next(err);
        }
        req.flash("success" , "you are logged out !");
        res.redirect("/listings");
    });
})

module.exports= router;
``