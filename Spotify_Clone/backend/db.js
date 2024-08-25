const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGODB_URI}/Spotify-c`)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
