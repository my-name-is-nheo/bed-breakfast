const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cassandra = require("cassandra-driver");
let app = express();
const port = 3001;
app.use(express.json());
app.use(express.static(__dirname + "/../public/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

const client = new cassandra.Client({
  keyspace: "airbnb",
  localDataCenter: "datacenter1",
  contactPoints: ["127.0.0.1"],
});
client.connect((err) => {
  if (err) {
    console.log(`not connected to cassandra`);
  }
  console.log(`connected to cassandra`);
});
app.get("/api/airbnb.users/", (req, res) => {
  var id = req.query.id;
  var query = `select * from users where user_id=${id}`;
  client.execute(query, (err, result) => {
    console.log("hello from cassandra, not postgress or mongo");
    if (err) {
      console.log(`error from get request (cassandra)`);
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/airbnb.users/", (req, res) => {
  var body = req.body.body;
  var name = req.body.name;
  var user_id = req.body.user_id;
  var imageUrl = req.body.imageUrl;
  var cleanliness = req.body.cleanliness;
  var communication = req.body.communication;
  var value = req.body.value;
  var accuracy = req.body.accuracy;
  var checkIn = req.body.checkIn;
  var location = req.body.location;
  var query = `insert into users(user_id,name,imageUrl, body, cleanliness,communication, value, accuracy, checkIn, location) values (${user_id},'${name}','${imageUrl}','${body}',${cleanliness},${communication},${value},${accuracy},${checkIn},${location})`;
  client.execute(query, (err, results) => {
    if (err) {
      console.log(`error from post request(cassandra)`, err);
    }
    console.log("successfully sent to database");
    res.end();
  });
});

app.listen(port, () => {
  console.log(`app is running on port 3001`);
});
