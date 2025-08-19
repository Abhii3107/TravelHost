const Listing = require("../models/listing")

const axios = require("axios");

const TYPES = ["temple","Room", "beach", "mountain", "city", "camping",  "lake", "ski", "pet-friendly" , "Villa"  ,"Boat"];

// ADDED
async function geocodeWithMapTiler(query) {
  const key = process.env.MAPTILER_KEY;
  if (!key || !query || !query.trim()) return null;
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json`;
  const params = { key, limit: 1 };
  const { data } = await axios.get(url, { params });
  if (data && data.features && data.features.length > 0) {
    const [lng, lat] = data.features[0].center;
    return { type: "Point", coordinates: [lng, lat] };
  }
  return null;
}

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

// ADDED: geocode and set geometry
try {
  const geo = await geocodeWithMapTiler(body.location);
  if (geo) newListing.geometry = geo;
} catch (e) {
  console.warn("Geocoding failed (create):", e.message);
}

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

// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
  
//    const body = req.body.listing || {};

//   let listing = await Listing.findByIdAndUpdate(
//     id,
//     { ...body},
//     { new: true, runValidators: true }
//   );

// //  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //(2)object pass kr rhe jiske andr listing ke values ko individual value mai convert kr rhe
  
//   if(typeof req.file !=="undefined"){
//   let url = req.file.path;
//   let filename =req.file.filename;
//   listing.image = {url, filename};
//   await listing.save();
//   }
 
//  req.flash("success" , "Listing Updated !");
//   res.redirect(`/listings/${id}`); // direct to show route
// }

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const body = req.body.listing || {};

  // CHANGED: load doc first to compare location & update geometry
  let listing = await Listing.findById(id); // CHANGED
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  // ADDED: re-geocode if location changed
  const incomingLocation = (body.location || "").trim();
  if (incomingLocation && incomingLocation !== listing.location) {
    try {
      const geo = await geocodeWithMapTiler(incomingLocation);
      if (geo) listing.geometry = geo;
    } catch (e) {
      console.warn("Geocoding failed (update):", e.message);
    }
  }

  // CHANGED: apply updates via document instance to save geometry + fields together
  listing.set({ ...body }); // CHANGED

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save(); // CHANGED

  req.flash("success", "Listing Updated !");
  res.redirect(`/listings/${id}`);
};



module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success" , "Listing Deleted!")
  res.redirect("/listings");
}