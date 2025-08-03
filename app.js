const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const listings = require("./routes/listings.js");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const Listing = require("./models/listing.js");

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

app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send("root is Working");
});


let validateReview = (req , res ,next)=>{
     let {error} = reviewSchema.validate(req.body);      // JOy validating defineschema 
      console.log(error);

       if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
               throw new ExpressError(400 ,errMsg);
               }
        else{
          next();
          }
}

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

app.use("/listings" , listings);


//Reviews
//Post Review Route
app.post("/listings/:id/reviews" , validateReview ,wrapAsync(async (req, res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("new review save");
  res.redirect(`/listings/${listing._id}`);

}));

//Delete Review Route
app.delete("/listings/:id/reviews/:reviewId" , wrapAsync(async(req,res) => {
   let {id , reviewId} = req.params;
 
   //$pull - this operator removes from an existing array all instances of a value that match a specified conddition.
   await Listing.findByIdAndUpdate(id , {$pull : {reviews: reviewId} }); // to filter that review specific id from listing and delete -pull(listing table)
   await Review.findByIdAndDelete(reviewId); // to remove that review id from review collection
   res.redirect(`/listings/${id}`);

}));


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
*/

