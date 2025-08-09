const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn ,isReviewAuthor} = require("../middleware.js");

//Reviews
//Post Review Route
router.post("/" ,isLoggedIn , validateReview ,wrapAsync(async (req, res)=>{      //"/listings/:id/reviews"
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

 req.flash("success" , "New review created !");
  res.redirect(`/listings/${listing._id}`);

}));

//Delete Review Route
router.delete("/:reviewId" ,isLoggedIn, isReviewAuthor, wrapAsync(async(req,res) => { //"/listings/:id/reviews/:reviewId"
   let {id , reviewId} = req.params;
 
   //$pull - this operator removes from an existing array all instances of a value that match a specified conddition.
   await Listing.findByIdAndUpdate(id , {$pull : {reviews: reviewId} }); // to filter that review specific id from listing and delete -pull(listing table)
   await Review.findByIdAndDelete(reviewId); // to remove that review id from review collection
   req.flash("success" , "New review deleted !");
   res.redirect(`/listings/${id}`);
}));

module.exports = router;