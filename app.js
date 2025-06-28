const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

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
    res.send("Project began");
});


app.get("/testListing", async(req,res) =>{

           let sampleListing = new Listing({
            title:"My New Villa",
            description:"By the Beach",
            price: 1200,
            location : "Calangute , Goa",
            country: "India"
           });
    
    await sampleListing.save();
    console.log("sample is saved");
    res.send("Succesful testing");
});






















/*
npm init
npm i express
npm i ejs
npm i mongoose
*/