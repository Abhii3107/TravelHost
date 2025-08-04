const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(8080, () => {
  console.log("Server is listening at port : 8080");
});

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized:true,
  cookie: {
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge:  7 * 24 * 60 * 60 * 1000,
     httpOnly: true
  }
}

app.get("/", (req, res) => {
  res.send("root is Working");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//jitne bhi nye user aaye unko autheticate krwana

passport.serializeUser(User.serializeUser()); // serialize user into session - user ke related information session ke andr store krana - to usko ek session mai baar baar login nhi krna hoga
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next ) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/",userRouter);


// app.get("/testListing", async(req,res) =>{

//            let sampleListing = new Listing({
//             title:"My New Villa",
//             description:"By the Beach",
//             price: 1200,
//             location : "Calangute , Goa",
//             country: "India"
//            });

//     await sampleListing.save();
//     console.log("sample is saved");
//     res.send("Succesful testing");
// });

//-------------------------------






// app.all("*",(req,res,next) =>{
//   next( new ExpressError(404,"Page Not found !"));
// });

// app.all("*", (req, res) => {
//   res.status(404).send("❌ Page Not Found");
// });

app.use((err,req,res,next) =>{
  let{status=500,message = "something went wrong"}=err;
  // res.status(status).send(message);
  res.status(status).render("error.ejs",{message});
});


/*
npm init
npm i express
npm i ejs
npm i mongoose
npm i method-override
npm i ejs-mate

npm  i joi
npm i express-session
npm i connect-flash

npm i passport
npm i passport-local
npm i passport-local-mongoose
*/

