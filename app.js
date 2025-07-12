const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

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

app.get("/", (req, res) => {
  res.send("root is Working");
});

let validateListing = (req , res ,next)=>{
     let {error} = listingSchema.validate(req.body);      // JOy validating defineschema 
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

//INDEX ROUTE
app.get("/listings", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}));

//----------------------------------------------
// Create Route

app.get("/listings/new", (req, res) => {
//In Express, routes are matched top to bottom
  res.render("listings/new.ejs"); //In Express, always define static routes first, and dynamic (:params) routes later.Otherwise, the dynamic ones will hijack the request.
  // if we write show route above from create route
  //then, when we search "localhost/listing/new" new is understand as id params
});

app.post("/listings", validateListing ,wrapAsync(async (req, res,) => {
  // let {title,description,image,price,country,Location}= req.body;
// if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing");
// }

  const newListing = new Listing(req.body.listing); // creating new instance (extract all listing properties)
  await newListing.save();
  res.redirect("/listings");
})
);

//-----------------------------------------
//Show Route   -  GET /listings/:id ->specific listing Data

app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//----------------------------------------
//Update -> Edit and Update Route               (1) GET/listing/:id/edit ->Edit form -> when submit -> (2) PUT/listing/:id

//Edit Route
app.get("/listings/:id/edit",wrapAsync(async (req, res) => {
//   if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing");
// }
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id", validateListing ,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //(2)object pass kr rhe jiske andr listing ke values ko individual value mai convert kr rhe
  res.redirect(`/listings/${id}`); // direct to show route
}));

//Delete Route -- /listing/:id

app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
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
*/
