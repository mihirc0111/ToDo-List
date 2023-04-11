//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");

const date=require(__dirname+"/date.js")

const request = require("request");
const https = require("https");
require("dotenv").config();
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const items=["Buy Food","Cook Food","Eat Food"];
const workItems=[];


app.set('view engine', 'ejs');
app.use(express.static("public")); 


app.get("/", function (req, res) {



    // console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    // console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
    // console.log(today.toLocaleDateString("hi-IN", options)); // शनिवार, 17 सितंबर 2016


    // res.render("list", { kindOfDay: day, newListItems: items });
    const day=date.getDate();
    res.render("list", { listTitle: day, newListItems: items });
});


app.get("/work",function(req,res){

    res.render("list", { listTitle:"WorkList", newListItems: workItems });
})

app.get("/about",function(req,res){

    res.render("about");
})


app.post("/work", function (req, res) {

    const item = req.body.newItem;
    workItems.push(item);
    console.log(item);
    res.redirect("/work");//we gop over to above get method
});




//This is all the back end that will happen in the server in order to fetch the data from the API and send it back to our website
app.post("/", function (req, res) {
    console.log(req.body);
    const item = req.body.newItem;

if(req.body.list==="WorkList"){
    workItems.push(item);
    res.redirect("/work");
}else{
    items.push(item);
    res.redirect("/");
}

    
   
    console.log(item);
    
});

app.post("/reset", function (req, res) {
    items.splice(0, items.length);
    workItems.splice(0, workItems.length);
    res.redirect("/");
  });
  



app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000 or " + process.env.PORT);
});
