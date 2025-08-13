const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const { isLoggedIn ,isOwner , validateListing} = require("../middleware.js");

const multer  = require('multer');
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router.route("/")
.get( wrapAsync(listingController.index))
.post( 
  isLoggedIn , 
  validateListing ,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing)
);

// .post(upload.single("listing[image]"), (req, res) => {
//     res.send(req.file);
// });


//New Route
router.get("/new", isLoggedIn , listingController.renderNewForm );

router.route("/:id")
.get(wrapAsync(listingController.ShowListing))
.put(
  isLoggedIn 
  ,isOwner ,
  upload.single("listing[image]"),
  validateListing ,
  wrapAsync(listingController.updateListing))
.delete(isLoggedIn ,isOwner, wrapAsync(listingController.destroyListing))

//Edit Route
router.get("/:id/edit",isLoggedIn ,isOwner ,wrapAsync(listingController.editListing));

module.exports = router; 


//------to understand------

//INDEX ROUTE
// router.get("/", wrapAsync(listingController.index));

//----------------------------------------------        
//In Express, routes are matched top to bottom
//In Express, always define static routes first, and dynamic (:params) routes later.Otherwise, the dynamic ones will hijack the request.
 // if we write show route above from create route
//then, when we search "localhost/listing/new" new is understand as id params

// Create Route

// router.post("/", validateListing ,wrapAsync(listingController.createListing)
// );

//-----------------------------------------
//Show Route   -  GET /listings/:id ->specific listing Data

// router.get("/:id", wrapAsync(listingController.ShowListing));

//----------------------------------------
//Update -> Edit and Update Route               (1) GET/listing/:id/edit ->Edit form -> when submit -> (2) PUT/listing/:id


//Update Route
// router.put("/:id",isLoggedIn , isOwner ,
//   validateListing ,
//   wrapAsync(listingController.updateListing));

//Delete Route -- /listing/:id

// router.delete("/:id",isLoggedIn ,isOwner, wrapAsync(listingController.destroyListing));

