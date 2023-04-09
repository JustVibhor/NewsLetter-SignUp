<<<<<<< HEAD
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
=======
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blog! My name is Vibhor, and I am excited to share my thoughts, experiences, and insights with you. I created this blog to provide a space where I can express myself and connect with like-minded individuals who share my interests and passions. Through this blog, I hope to inspire and motivate others to pursue their dreams and live their best lives. Whether you are interested in travel, cooking, personal development, or anything in between, I hope to provide valuable insights and information that will help you on your journey. I believe that everyone has a unique story to tell, and I am passionate about sharing mine. From personal reflections to how-to guides, I am committed to creating content that is informative, engaging, and thought-provoking. I invite you to join me on this journey and to share your own stories and experiences along the way. Thank you for visiting my blog, and I look forward to getting to know you better!";
const aboutContent = "Welcome to Daily Journal, a platform where I share my thoughts, experiences, and insights on a variety of topics that inspire and motivate me. My name is Vibhor, and I am a developer with a passion for Computer Science. I started this blog as a way to express myself and connect with others who share my interests. Here, you will find a variety of content, including personal stories, how-to guides, opinion pieces, and more. My goal is to provide valuable insights and information that will help you on your own journey, whether that be in travel, cooking, personal development, or anything in between. I believe that everyone has a unique story to tell, and I am committed to creating a safe and inclusive space where people from all walks of life can come together to share their experiences and perspectives. I value diversity and welcome respectful dialogue and constructive feedback. Thank you for visiting my blog, and I hope you enjoy exploring the content I have to offer. If you have any questions or comments, please feel free to reach out to me. I look forward to hearing from you!";
const contactContent = "If you have any questions, comments, or feedback, we would love to hear from you! You can reach us through the email, social Media. We value your input and strive to provide the best possible experience for our readers. Whether you have a suggestion for a future blog post, a question about a topic we've covered, or just want to say hello, we look forward to hearing from you! Thank you for your interest in our blog, and we hope to connect with you soon.";

const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});


app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postTitle", function(req, res) {

  const requestedTitle = (_.lowerCase(req.params.postTitle));
  
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title)
    if(storedTitle === requestedTitle) {
      res.render("post", {postTitle: post.title, postBody: post.content})
    } else {
      console.log("Match Not found");
    }
  });
  
});

app.post("/compose", function(req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
>>>>>>> 19cd3c6 (Update js and ejs files)
