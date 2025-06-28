const mongoose = require("mongoose");
const initData =require("./data.js");

const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async ()=>{
   await Listing.deleteMany({});

    // ✅ Convert each listing's image object to string (image.url)
   const allData = initData.data.map((listing) => ({
    ...listing,
    image: listing.image.url, // only use the URL string
  }));

  await Listing.insertMany(allData);

   console.log("Data is initialized");
}

initDB();