const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); 

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const Listing = require("./models/listing.js");

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

app.listen(8080,()=>{
    console.log("Server is listening at port : 8080");
});

app.get("/",(req,res) =>{
    res.send("root is Working");
});


// app.get("/testListing", async(req,res) =>{

//            let sampleListing = new Listing({
//             title:"My New Villa",
//             description:"By the Beach",
//             price: 1200,
//             location : "Calangute , Goa",
//             country: "India"
//            });
    
//     await sampleListing.save();
//     console.log("sample is saved");
//     res.send("Succesful testing");
// });

//-------------------------------

//INDEX ROUTE
app.get("/listings",async (req,res) =>{
  const allListing = await Listing.find({});
  res.render("listings/index.ejs",{allListing});
});

//----------------------------------------------
// Create Route

app.get("/listings/new",(req,res)=>{                   //In Express, routes are matched top to bottom         
     res.render("listings/new.ejs");                  //In Express, always define static routes first, and dynamic (:params) routes later.Otherwise, the dynamic ones will hijack the request.
                                                     // if we write show route above from create route 
                                                     //then, when we search "localhost/listing/new" new is understand as id params 
});

app.post("/listings",async(req,res) =>{
    // let {title,description,image,price,country,Location}= req.body;
    const newListing = new Listing(req.body.listing); // creating new instance (extract all listing properties)
    await newListing.save();
     res.redirect("/listings");   
});

//-----------------------------------------
 //Show Route   -  GET /listings/:id ->specific listing Data 

app.get("/listings/:id", async(req,res) =>{
    let {id}= req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/show.ejs",{listing});   
});

//----------------------------------------
//Update -> Edit and Update Route               (1) GET/listing/:id/edit ->Edit form -> when submit -> (2) PUT/listing/:id

//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id", async(req,res) =>{
    let {id} =req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing}); //(2)object pass kr rhe jiske andr listing ke values ko individual value mai convert kr rhe
    res.redirect(`/listings/${id}`); // direct to show route
});

//Delete Route -- /listing/:id

app.delete("/listings/:id",async(req,res) =>{
    let {id} = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   res.redirect("/listings");
 });














/*
npm init
npm i express
npm i ejs
npm i mongoose
npm i method-override
npm i ejs-mate
*/