const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost/airbnb";
const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const User = mongoose.model("users", userSchema);

const reviewsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rental: Number,
  body: String,
  date: { type: Date, default: Date.now },
  cleanliness: Number,
  communication: Number,
  value: Number,
  accuracy: Number,
  checkIn: Number,
  location: Number,
});

const Review = mongoose.model("reviews", reviewsSchema);

module.exports.User = User;
module.exports.Review = Review;
