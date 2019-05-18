// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const LineSchema = new Schema(
  {
    index: Number,
    line: String,
    audioTime: Number,
    tweet: Object,
    imageTweet: Object
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Line", LineSchema);
