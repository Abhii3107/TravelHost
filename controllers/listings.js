const Listing = require("../models/listing")

const axios = require("axios");

const TYPES = ["beach", "mountain", "arctic", "desert", "forest", "city", "island", "trending"];

module.exports.index=async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewForm= (req, res) => {
  // console.log(req.user);
  res.render("listings/new.ejs" ,{TYPES});
}

module.exports.createListing  = async (req, res,) => {
  // let {title,description,image,price,country,Location}= req.body;
// if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing");
// }

  let url = req.file.path;
  let filename = req.file.filename;
   
  const body = req.body.listing || {}; // must include listing[type] from the form // CHANGED
  const newListing = new Listing({
    ...body // contains title, description, price, country, location, type // CHANGED
  });

  // const newListing = new Listing(req.body.listing); // creating new instance (extract all listing properties)
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success" , "New Listing created !");
  console.log("✅ Flash message added"); 
  res.redirect("/listings");
}


module.exports.ShowListing= async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
  path :"reviews",
  populate:{
    path:"author"
  },
  })
  .populate("owner");
  if(!listing){
    req.flash("error" , "Listing you requested for does not exist");
   return  res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}

//--
module.exports.editListing = async (req, res) => {
//   if(!req.body.listing){
//   throw new ExpressError(400,"send valid data for listing");
// }
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist");
   return res.redirect("/listings");
  }

let originalImageUrl = listing.image.url;
if (originalImageUrl && originalImageUrl.includes("/upload/")) {
  originalImageUrl = originalImageUrl.replace("/upload/", "/upload/h_300,w_250/");
}


  // let originalImageUrl = listing.image.url; 
  // originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl , TYPES});  // originalImageUrl
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  
   const body = req.body.listing || {};

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...body},
    { new: true, runValidators: true }
  );

//  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //(2)object pass kr rhe jiske andr listing ke values ko individual value mai convert kr rhe
  
  if(typeof req.file !=="undefined"){
  let url = req.file.path;
  let filename =req.file.filename;
  listing.image = {url, filename};
  await listing.save();
  }
 
 req.flash("success" , "Listing Updated !");
  res.redirect(`/listings/${id}`); // direct to show route
}




module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success" , "Listing Deleted!")
  res.redirect("/listings");
}