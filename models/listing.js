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
        type: String,
        default: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,// when image field is undifined
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v, // ternary operator - agr user koi khud se image deta hai to wh hojayega , agr nhi tb default link wala image set hojayega
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete" , async(listing) => { // now when any listing is deleted its review is also deleted from review collection
    if(listing){
     await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing =mongoose.model("Listing",listingSchema);
module.exports = Listing;
