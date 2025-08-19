if(process.env.NODE_ENV   != "production") {
require('dotenv').config();
}

console.log(process.env)

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
const MongoStore = require('connect-mongo');

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



// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl =process.env.ATLASDB_URL

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);  //dbUrl
}

// mongoose.connect(dbUrl, {

//   tls: true
// })
// .then(() => console.log("Connected to DB"))
// .catch(err => console.log("MongoDB Atlas connection error:", err));

app.listen(8080, () => {
  console.log("Server is listening at port : 8080");
});


 // express session mai - by default hmari local storage mai session related storage store hoti hai ,To hmare session store ki default storage hoti hai - meomry storage  ,wh kwel development environment ke liye hota hai na ki production environment ke liye , only meant to debugging and developing
 
 // so we other session storage - connect-mongo - which is mongodb session storage 

const store = MongoStore.create({
   mongoUrl: dbUrl,              
  crypto:{
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600, // agr session mai kuch change nhi hua , sirf refresh ho rha ,so after 1day in second  then  session infromation updated
});

store.on("error" ,() =>{
  console.log("Error in MONGO SESSION STORE" , err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: {
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge:  7 * 24 * 60 * 60 * 1000,
     httpOnly: true
  }
}





app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//jitne bhi nye user aaye unko autheticate krwana

passport.serializeUser(User.serializeUser()); //save only user id  into session
passport.deserializeUser(User.deserializeUser());//fetch users full data from session on every request

app.use((req , res , next ) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  res.locals.currUser = req.user || null; //if user is logged in then req.user will have user data , otherwise it will be null


  next();
})

const searchRoutes = require("./routes/search"); // ADDED

app.use("/search", searchRoutes); // ADDED

app.get("/", (req, res) => {
  // res.send("root is Working");
  res.redirect("/listings");
});


app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/",userRouter);


/*app.get("/demouser" , (req,res) => {
  let fakerUser = newUser({
  email: "student@gmail.com",
  username: "abhay-123"
  });
  
  let registeredUser = await User.register(fakeUser , "helloword");
  res.send(registeredUser)
  }) */


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

Upload Image
npm i multer
npm i dot env
npm i cloudinary
npm i multer-storage-cloudinary

npm i connect-mongo

*/

