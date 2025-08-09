const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req,res,next) => {
    // console.log(req.user);
    // console.log(req.path, "..." , req.originalUrl);
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;   // req. session mai ek redirectUrl variable bna ke usme original url store kra dege 
      // why in req.session - because every method and middleware have access of req.session 
    req.flash("error" , "you must be first logged in , to create listing !");
    return res.redirect("/login");
  } 
  next();
}
//------------------------------
//if user is logout , and it click add listing then our page will redirect to login , which is correct but when it login , user must redirect to add page (because he was at that page in starting)

//when we login after authentication, session automatically reset to new ,so session.redirectUrl is lost so we save in res.locals
module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl){       
    res.locals.redirectUrl = req.session.redirectUrl
  }
  next();
}

//-----
module.exports.isOwner = async(req,res,next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error", "you are not the owner of this Listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

//---
module.exports.validateListing = (req , res ,next)=>{
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

//--
module.exports.validateReview = (req , res ,next)=>{
     let {error} = reviewSchema.validate(req.body);      // JOy validating defineschema 
      console.log(error);

       if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
               throw new ExpressError(400 ,errMsg);
               }
        else{
          next();
          }
};

//--
module.exports.isReviewAuthor= async(req,res,next) =>{
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}