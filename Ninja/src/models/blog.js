const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: String,
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Blog = mongoose.model("blog", blogSchema);

console.log(Blog);

module.exports = { Blog };
