const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
let app = express();
const port = 3001;
app.use(express.json());
app.use(express.static(__dirname + "/../public/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: "nheo",
  host: "localhost",
  database: "mysdc",
  port: 5432,
});
// pool
//   .connect()
//   .then(() => {
//     console.log(`postgres on port 5432`);
//   })
//   .catch((e) => {
//     `error opening postgres`;
//   });
app.get("/api/airbnb.users/", (req, res) => {
  var id = req.query.id;
  pool.query(
    `select * from airbnb.users where user_id=${id}`,
    (err, result) => {
      if (err) {
        console.log(`error from get request (postgres)`);
      }
      res.status(200).json(result.rows);
    }
  );
});
app.post("/api/airbnb.users/", (req, res) => {
  console.log(req.body);
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
  pool.query(
    `insert into airbnb.users(user_id,name,imageUrl, body, cleanliness,communication, value, accuracy, checkIn, location) values ('${user_id}','${name}','${imageUrl}','${body}','${cleanliness}','${communication}','${value}','${accuracy}','${checkIn}','${location}')`,
    (err, results) => {
      if (err) {
        console.log(`error from post request(postgres)`, err);
      }
      console.log("successfully sent to database");
      res.status(200).json(results);
    }
  );
});

// app.put("/api/airbnb.users/", (req, res) => {});
// app.delete("/api/airbnb.users/", (req, res) => {
//   var id = req.params.id;
//   pool.query(`delete from airbnb.users where user_id=${id}`, (err, results) => {
//     if (err) {
//       console.log(`error deleting id # ${id} from postgres`);
//     }
//     res.send(200).json(results);
//   });
// });

app.listen(port, () => {
  console.log(`app is running on port 3001`);
});
