const express = require("express");
const path = require("path");
const { User, Review } = require("../db/index.js");
const cors = require("cors");
let app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.static(__dirname + "/../public/dist"));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/rentals/:id", async (req, res) => {
  try {
    let reviews = await Review.find({ rental: req.params.id });
    let newArray = [];
    for (let i = 0; i < reviews.length; i++) {
      let user = await User.findById(reviews[i].user);
      let copy = { ...reviews[i]._doc, userProfile: user };
      newArray.push(copy);
    }
    res.json(newArray);
  } catch (e) {
    res.sendStatus(500);
  }
});

//=====================================WORKS!
app.post("/api/rentals/", async (req, res) => {
  console.log(req.body, `from post request`);
  const review = new Review(req.body);
  review
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.json(err));
});
//===================================== WORKS!
app.delete("/api/rentals/:id", (req, res) => {
  console.log(`this is req.params`, req.params);
  Review.findOneAndDelete({ _id: new mongoose.mongo.ObjectID(req.params.id) })
    .then(() => res.end("delete successful"))
    .catch(() => res.json("There was an error deleting a content from User"));
});
//===================================== WORKS!
app.put("/api/rentals/:id", (req, res) => {
  console.log(`this is req.body for put`, req.body);
  console.log(`this is req.params`, req.params);

  Review.findOneAndUpdate(
    { _id: new mongoose.mongo.ObjectID(req.params.id) },
    req.body
  )
    .then(() => res.json("updated!"))
    .catch(() => res.json(`error  updated content from User`));
});
//=====================================

app.get("/app.js", cors(), async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist/bundle.js"));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port);
