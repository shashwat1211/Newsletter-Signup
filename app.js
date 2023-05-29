const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

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
    const url = "https://us21.api.mailchimp.com/3.0/lists/c93d957e52"
    const options = {
        method: "POST",
        auth:"shashwat:c6ff2cfc651b60ca41c518305577c9e5-us21"
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


// api key
// c6ff2cfc651b60ca41c518305577c9e5-us21
// audience id
//c93d957e52