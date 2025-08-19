const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");
const { type } = require("express/lib/response.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        // type: String,   
        // default: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,// when image field is undifined
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v, // ternary operator - agr user koi khud se image deta hai to wh hojayega , agr nhi tb default link wala image set hojayega
     url: String,
     filename: String         
    },
    price: Number,
    location: String,
    country: String,
    
//     geometry: {         // <-- ADD THIS (GeoJSON)
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true
//     },
//     coordinates: {
//       type: [Number], // [lng, lat]
//       required: true
//     }
//   },

 // NEW: category/type
    type: {
      type: String,
      enum:  ["temple" ,"Room", "beach", "mountain", "city", "camping",  "lake", "ski", "pet-friendly" , "Villa"  ,"Boat"],
      required: true,
      index: true
    },
     
    // ADDED: store coordinates as GeoJSON Point [lng, lat]
     geometry: { // ADDED
    type: { type: String, enum: ["Point"], default: "Point", required: true }, // ADDED
     coordinates: { type: [Number], default: [77.2090, 28.6139], required: true } // ADDED (Delhi default)
        }, // ADDED

    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
});
  
listingSchema.index({ geometry: "2dsphere" }); // ADDED

listingSchema.post("findOneAndDelete" , async(listing) => { // now when any listing is deleted its review is also deleted from review collection
    if(listing){
     await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

// Text index for native search fallback and general queries
listingSchema.index({
  title: "text",
  description: "text",
  location: "text",
  country: "text",
  tags: "text"
});

const Listing =mongoose.model("Listing",listingSchema);
module.exports = Listing;
