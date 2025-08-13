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
//    const allData = initData.data.map((listing) => ({
//     ...listing,
//     image: listing.image.url, // only use the URL string
//   }));
//   await Listing.insertMany(allData);
 //-------------------
//    initData.data = initData.data.map((obj) =>({...obj , owner: "689476b509c2b3b85bd7c034"}))
//    await Listing.insertMany(initData.data);
//    console.log("Data is initialized");
    const allData = initData.data.map((listing) => ({
    ...listing,
    // image: typeof listing.image === "object" ? listing.image.url : listing.image,
    owner: new mongoose.Types.ObjectId("689476b509c2b3b85bd7c034") 
  }));

  await Listing.insertMany(allData)
  console.log("Data is initialized");
};

initDB();

//'689476b509c2b3b85bd7c034'