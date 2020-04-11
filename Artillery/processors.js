const faker = require("faker");
const moment = require("moment");

const post = (userContext, events, done) => {
  const user_id = Math.floor(Math.random() * 1000000) + 1;
  const imageUrl = "github.com";
  const name = faker.random.word();
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

  userContext.vars.user_id = user_id;
  userContext.vars.name = name;
  userContext.vars.imageUrl = imageUrl;
  userContext.vars.body = body;
  userContext.vars.cleanliness = cleanliness;
  userContext.vars.value = value;
  userContext.vars.date = date;
  userContext.vars.accuracy = accuracy;
  userContext.vars.checkIn = checkIn;
  userContext.vars.communication = communication;
  userContext.vars.location = location;

  return done();
};
("use strict");

module.exports = {
  post,
};
