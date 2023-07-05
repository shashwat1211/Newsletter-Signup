const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
require("dotenv").config()

const https = require("https")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/" ,(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})
app.post("/" , (req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data ={
        members: [{
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }]
        };
    const jsonData = JSON.stringify(data);
    const url = process.env.URI
    const options = {
        method: "POST",
        auth:process.env.AUTH
    }
   const request =  https.request(url ,options ,(response)=>{

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname +"/failure.html");
        }
        response.on("data" , (data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure" , (req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server is running")
});


