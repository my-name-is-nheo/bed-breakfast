require("newrelic");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const cors = require("cors");
let app = express();
const port = 3001;
app.use(express.json());
app.use(express.static(__dirname + "/../public/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

// const pool = new Pool({
//   user: "nheo",
//   host: "localhost",
//   database: "mysdc",
//   port: 5432,
// });
const pool = new Pool({
  user: "postgres",
  host: "ec2-18-220-245-234.us-east-2.compute.amazonaws.com",
  password: "myPassword",
  database: "mysdc",
  port: "5432",
});

pool
  .connect()
  .then(() => {
    console.log("postgres connected at 5432");
  })
  .catch((e) => {
    console.log(e, "postgress connection failed");
  });

app.get("/api/airbnb.users/", cors(), (req, res) => {
  // var id = req.params.id;
  // console.log(id);

  pool.query(`select * from airbnb.users limit 100`, (err, result) => {
    if (err) {
      console.log(`error from get request (postgres)`);
    }
    res.status(200).json(result.rows);
  });
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
// app.get(
//   "/loaderio-8eba86e886e10cd8412eef0fcd4cacec.txt",
//   cors(),
//   async (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../loaderio-8eba86e886e10cd8412eef0fcd4cacec.txt")
//     );
//   }
// );

app.listen(port, () => {
  console.log(`app is running on port 3001`);
});
