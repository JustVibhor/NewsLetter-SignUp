//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to our website! We're all about making you laugh, so sit back, relax, and get ready to chuckle.\nOur blog is the place to be for all things funny. From witty observations about daily life to hilarious commentary on pop culture, we've got you covered. Our team of talented writers works hard to bring you the best in comedy, so you can be sure that you'll always find something to brighten your day.\n Whether you're in the mood for a quick laugh or a deep belly laugh, we've got just the thing for you. Our blog features a variety of content, including funny stories, hilarious memes, and amusing videos. We update our blog regularly, so there's always something new to enjoy.\nBut we're not just about making you laugh. We're also committed to spreading positivity and kindness. We believe that laughter is the best medicine, and we're passionate about helping people find joy and happiness in their lives.\nSo come on in, take a look around, and join the fun. We're glad you're here, and we can't wait to make you smile.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/blogDB');

const postSchema = {
  title: String,
  content: String 
}

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}).then(function(posts) {

    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  }).catch(function(error) {
    console.log(error.message);
  });


});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});


app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/compose", function(req, res){

  
  const post = new Post ({
    title: _.upperFirst(req.body.postTitle),
    content: req.body.postBody
  });

  post.save().then(function() {
    res.redirect("/");
  }).catch(function(err) {
    console.log(err.message);
  });

});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  Post.find({title: requestedTitle}).then(function(post) {

    console.log(post.content)

    // const storedTitle = _.lowerCase(post.title);

    // if (storedTitle === requestedTitle) {
      res.render("post", {
        title: _.upperFirst(post[0].title),
        content: post[0].content
      });
    // }
  }).catch(function(error) {
    console.log(error);

  });


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
