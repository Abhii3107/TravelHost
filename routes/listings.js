const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");



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

//INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}));

//----------------------------------------------        
//In Express, routes are matched top to bottom
//In Express, always define static routes first, and dynamic (:params) routes later.Otherwise, the dynamic ones will hijack the request.
 // if we write show route above from create route
//then, when we search "localhost/listing/new" new is understand as id params

// Create Route
router.get("/new",isLoggedIn, (req, res) => {
  // console.log(req.user);
  res.render("listings/new.ejs");
});

router.post("/", validateListing ,wrapAsync(async (req, res,) => {
  // let {title,description,image,price,country,Location}= req.body;
// if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing");
// }
const newListing = new Listing(req.body.listing); // creating new instance (extract all listing properties)
  await newListing.save();
  req.flash("success" , "New Listing created !");
  console.log("✅ Flash message added"); 
  res.redirect("/listings");
})
);

//-----------------------------------------
//Show Route   -  GET /listings/:id ->specific listing Data

router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if(!listing){
    req.flash("error" , "Listing you requested for does not exist");
   return  res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));

//----------------------------------------
//Update -> Edit and Update Route               (1) GET/listing/:id/edit ->Edit form -> when submit -> (2) PUT/listing/:id

//Edit Route
router.get("/:id/edit",isLoggedIn ,wrapAsync(async (req, res) => {
//   if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing");
// }
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist");
   return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",isLoggedIn , validateListing ,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //(2)object pass kr rhe jiske andr listing ke values ko individual value mai convert kr rhe
  req.flash("success" , "Listing Updated !");
  res.redirect(`/listings/${id}`); // direct to show route
}));

//Delete Route -- /listing/:id

router.delete("/:id",isLoggedIn , wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success" , "Listing Deleted!")
  res.redirect("/listings");
}));

module.exports = router; 