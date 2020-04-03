const faker = require("faker");
const fs = require("fs");
const moment = require("moment");

const writeUsers = fs.createWriteStream("randomReviews.csv");
writeUsers.write(
  "id,name,imageUrl,rental,body,date,cleanliness,communication,value,accuracy,checkIn,location\n",
  "utf8"
);

function writeTenMillionReviews(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  let rentals = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      rentals += 1;
      const name = faker.name.findName();
      const imageUrl = faker.image.avatar();
      const body = faker.fake("{{lorem.paragraph}}");
      const cleanliness = Math.ceil(Math.random() * 5);
      const communication = Math.ceil(Math.random() * 5);
      var date = moment(
        new Date(+new Date() - Math.floor(Math.random() * 1000000000))
      ).format("l");
      const value = Math.ceil(Math.random() * 5);
      const accuracy = Math.ceil(Math.random() * 5);
      const checkIn = Math.ceil(Math.random() * 5);
      const location = Math.ceil(Math.random() * 5);
      const data = `${id},${name},${imageUrl},${rentals},${body},${date},${cleanliness},${communication},${value},${accuracy},${checkIn},${location}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once("drain", write);
    }
  }
  write();
}
writeTenMillionReviews(writeUsers, "utf-8", () => {
  writeUsers.end();
});
