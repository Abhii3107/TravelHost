const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.listen(8080,()=>{
    console.log("Server is listening at port : 8080");
});

app.get("/",(req,res) =>{
    res.send("Project began");
});






















/*
npm init
npm i express
npm i ejs
npm i mongoose
*/