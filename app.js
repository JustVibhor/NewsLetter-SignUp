const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const {
    send
} = require("express/lib/response");


const app = express();

app.use("/", bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));

app.post("/", function (req, res) {
    console.log("we received your post request.");

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const https = require("https");
    console.log("shi heh")
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };



    var jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/396b7bd45b";

    const options = {
        method: "POST",
        auth: "vibhor1:437e89cbfbc75abe7e8901ada4688d90-us14"
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();


    // res.send("<h1>Thanks for registering " + firstName + " " + lastName + "</h1>");


});

app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000.");
});


// api key
// 437e89cbfbc75abe7e8901ada4688d90-us14

// list id
// 396b7bd45b